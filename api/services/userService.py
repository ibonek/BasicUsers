from utils.helpers import ServiceBase, debugMessage
from models import User
from services.security import getPasswordHash


class Service(ServiceBase):
    def __int__(self):
        super().__init__(User)

    def getByLogin(self, login: str) -> User:
        return super().getOne(User.login == login)

    def create(self, data: dict) -> User:
        if 'password' in data:
            data['password'] = getPasswordHash(data['password'])
        return super().create(data)

    def update(self, user: User, updates: dict) -> User:
        updatableFields = ["login", "password"]
        if "password" in updates:
            updates['password'] = getPasswordHash(updates['password'])
        return super().update(user, updates, updatableFields)


UserService = Service(User)