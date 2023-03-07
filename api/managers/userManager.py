import copy
import traceback
import json

from flask import jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity

from services.security import checkPasswordHash
from services.userService import UserService
from utils.misc import debugMessage


class UserManager():
    def logIn(self, request):
        data = request
        if not data or not data.get('login') or not data.get('password'):
            return jsonify({'success': False, 'message': 'Login failed'}), 401

        user = UserService.getByLogin(data['login'])
        if not user:
            return jsonify({'success': False, 'message': 'Login failed'}), 401

        if not checkPasswordHash(data['password'], user.password):
            return jsonify({'success': False, 'message': 'Login failed'}), 401

        access_token = create_access_token(identity=user.login, fresh=True)
        refresh_token = create_refresh_token(identity=user.login)
        return jsonify({'success': True, 'data': {'access_token': access_token, 'refresh_token': refresh_token}}), 201

    def refresh(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return jsonify({'success': True, 'access_token': new_token}), 201

    def getCurrentUser(self, user):
        return jsonify({'success': True, 'data': user.toJSON()}), 200

    def getUsers(self):
        users, metadata = UserService.pagination().sorting().filtering().exec()
        return jsonify({'success': True,'data': [x.toJSON() for x in users], 'meta': metadata}), 200

    def getUser(self, userID: str):
        user = UserService.getById(userID)
        if user is None:
            return jsonify({'success': False, 'message': 'El usuario no existe'}), 404
        return jsonify({'success': True, 'data': user.toJSON()}), 200

    def createUser(self, request):
        data = request.json
        if not data or not data.get('login') or not data.get('password'):
            return jsonify({'success': False, 'message': 'Login failed'}), 401
        if UserService.getByLogin(data.get('login')) is not None:
            return jsonify({'success': False, 'message': 'Login failed'}), 401
        try:
            user = UserService.create(data)
            access_token = create_access_token(identity=user.login, fresh=True)
            refresh_token = create_refresh_token(identity=user.login)
            return jsonify({'success': True, 'data': {'access_token': access_token, 'refresh_token': refresh_token}}), 201
        except Exception:
            t = traceback.format_exc()
            debugMessage(f'Error al crear usuario: {t}')
            return jsonify({'success': False, 'message': 'Error al crear usuario'}), 500

    def updateUser(self, request, userID):
        user = UserService.getById(userID)
        if user is None:
            return jsonify({'success': False, 'message': 'El usuario no existe'}), 404
        try:
            nuser = UserService.update(user, request.json)
            return jsonify({'success': True, 'data': nuser.toJSON()}), 200
        except Exception:
            t = traceback.format_exc()
            debugMessage(f'Error al modificar usuario: {t}')
            return jsonify({'success': False, 'message': 'Error al modificar usuario'}), 500

    def deleteUser(self, userID):
        user = UserService.getById(userID)
        if user is None:
            return jsonify({'success': False, 'message': 'El usuario no existe'}), 404
        try:
            UserService.delete(user)
            return jsonify({'success': True}), 200
        except Exception:
            t = traceback.format_exc()
            debugMessage(f'Error al eliminar usuario: {t}')
            return jsonify({'success': False, 'message': 'Error al eliminar usuario'}), 500
