from flask import Flask, jsonify
from flask_restful import Api, Resource
from controllers import blueprints
from extensions import db, migrate, jwt
from flask_cors import CORS
import config


def createApp():
    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    # Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()
        db.session.commit()
    # API endpoints
    for bp in blueprints: app.register_blueprint(bp)

    return app


app = createApp()

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
