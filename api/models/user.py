from extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(256), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=True)

    def toJSON(self) -> dict:
        res = {
            'id': self.id,
            'login': self.login,
            'password': self.password
        }

        return res
