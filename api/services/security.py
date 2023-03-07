import bcrypt
import secrets


DEBUG = True # Control validation for developing purposes

def getPasswordHash(password):
    try:
        password = password.encode('utf-8')
    except (UnicodeDecodeError, AttributeError):
        pass
    return bcrypt.hashpw(password, bcrypt.gensalt())

def checkPasswordHash(password, hash):
    try:
        password = password.encode('utf-8')
    except (UnicodeDecodeError, AttributeError):
        pass
    return bcrypt.checkpw(password, hash.encode('utf-8'))

def generateAPIKey():
    return secrets.token_urlsafe(32)




