import re
from sqlalchemy.sql import asc, desc
from sqlalchemy import or_, and_
from extensions import db
from utils.misc import debugMessage

'''
Usage:
  search = AdvancedSearch(Model, request.args)
  return search.pagination().sorting().filtering().exec()
  return search.pagination(max=20).exec()
  return search.pagination().sorting().filtering(allowed=['name']).exec()
  return search.pagination(max=20).sorting(default='id').filtering(allowed=['name','login']).exec()

Example queries:

  * Pagination
    - ?limit=10&page=1

  * Sorting
    - ?sort=+created_at,-name,id

  * Filtering
    - ?name=Test-51&name=Test-52&login=Test-52 // return Test-52
    - ?name=Test-51&name=Test-52&login[like]=Test-%25 // Returns Test-51 and Test-52
    - ?name[in]=Test-51&name[in]=Test-52&login[like]=Test-%25 // Returns Test-51 and Test-52
    - ?name=Test-51&name=Test-52&login[not]=Test-52 // return Test-51
    - ?name=Test-51&name=Test-52&login[not]=Test-52&updated_at[gt]=2023-02-01 // Returns Test-52
'''

FILTERING_OPERATORS = {
  "in": "in_",
  "eq": "__eq__",
  "not": "__ne__",
  "gte": "__ge__",
  "lte": "__le__",
  "gt": "__gt__",
  "lt": "__lt__",
  "like": "like",
}
class AdvancedSearch:
  def __init__(self, model, args):
    self.model = model
    self.args = args
    self.page = None
    self.limit = None
    self.sort = None
    self.filters = None

  def pagination(self, max=50):
    self.page = self.args.get('page', 1, type = int)
    self.limit = self.args.get('limit', 10, type = int)
    if self.limit > max: self.limit = max
    return self
  
  def sorting(self, default="id"):
    self.sort = []
    sort_fields = self.args.get('sort', default, type = str).split(",")
    for field in sort_fields:
      if field[0] in ['+',' ']: field = field[1:]
      self.sort.append(desc(field[1:]) if field[0] == '-' else asc(field))
    return self

  def _parse_param(self, param, value):
    regex = r"(?P<col>.*)\[(?P<op>.*)\]"
    if m := re.search(regex, param):
      return {"col": m.group("col"), "op": m.group("op"),  "val": value}
    return {"col": param, "op": "in",  "val": value}

  def filtering(self, allowed=None):
    self.filters = []
    margs = self.args.to_dict(flat=False)
    for param in margs:
      filter = self._parse_param(param, margs[param])
      
      if allowed and filter['col'] not in allowed: continue
      try: column = getattr(self.model, filter['col'])
      except: continue
      if not filter['op'] in FILTERING_OPERATORS: continue

      operation = getattr(column, FILTERING_OPERATORS[filter['op']])(filter['val'])
      self.filters.append(operation)
    return self
  
  def exec(self):
    q = self.model.query
    if self.filters: q = q.filter(*self.filters)
    if self.sort: q = q.order_by(*self.sort)
    if self.page: q = q.paginate(page = self.page, per_page = self.limit)
    #items = self.model.query.filter(*self.filters).order_by(*self.sort).paginate(page = self.page, per_page = self.limit)
    results = [item for item in q]

    return results, {
      'count': len(results),
      'page': self.page,
      'limit': self.limit,
      'total': q.total,
      'sort': [str(i) for i in self.sort],
      'filters': [str(i) for i in self.filters]
    }


class ServiceBase:
  def __init__(self, model):
    self.model = model

  def get(self, filters=None, sort=None):
    q = self.model.query
    if filters is not None: q = q.filter(filters)
    if sort is not None: q = q.order_by(sort)
    return q.all()

  def count(self, filters=None):
    q = self.model.query
    if filters is not None: q = q.filter(filters)
    return q.count()

  def getOne(self, filters=None):
    q = self.model.query
    if filters is not None: q = q.filter(filters)
    return q.first()
  
  def getById(self, id):
    return self.model.query.get(id)

  def create(self, data):
    if 'id' in data: del data['id']
    obj = self.model(**data)
    return self.commit(obj)
  
  def update(self, obj, updates, updatableFields='*'):
    for f in updates:
      if f in updatableFields or updatableFields == '*': setattr(obj, f, updates[f])
    return self.commit(obj)

  def commit(self, obj):
    db.session.add(obj)
    db.session.commit()
    return obj

  def delete(self, obj):
    db.session.delete(obj)
    db.session.commit()

  def search(self, args):
    return AdvancedSearch(self.model, args)
  
