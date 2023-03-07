from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from managers.userManager import UserManager

router = Blueprint('api_users', __name__)

manager = UserManager()


@router.route('/api/users/login', methods=['POST'])
def login():
    return manager.logIn(request)


@router.route('/api/users/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    return manager.refresh()


@router.route('/api/user', methods=['GET'])
def getCurrentUser(user):
    return manager.getCurrentUser(user)


@router.route('/api/users', methods=['GET'])
def getUsers():
    return manager.getUsers()


@router.route('/api/users/<userID>', methods=['GET'])
def getUser(userID):
    return manager.getUsers(userID)


@router.route('/api/users/register', methods=['POST'])
def createUser():
    return manager.createUser(request)

@router.route('/api/users/<userID>', methods=['PUT'])
def updateUser(userID):
    return manager.updateUser(userID, request)


@router.route('/api/users/<userID>', methods=['DELETE'])
def deleteUser(userID):
    return manager.deleteUser(userID)



