from datetime import datetime
import hashlib
import hmac
import sys

def debugMessage(message, end="\n", withTimestamp = True) -> None:
    if withTimestamp: print(f"[{datetime.utcnow()}] {message}", file=sys.stdout, flush=True, end=end)
    else: print(message, file=sys.stdout, flush=True, end=end)

def stripStrings(data):
    for k in data:
        if type(data[k]) is str:
            data[k] = data[k].strip()

def timestamp(dt):
    return int(datetime.timestamp(dt)) * 1000

def md5(message: str) -> str:
    return hashlib.md5(message.encode('utf-8')).hexdigest()

def SHA1HMAC(key, text):
    return hmac.new(key.encode(), text.encode(), hashlib.sha1).hexdigest()

def splitInChunks(list, nItems):
    for i in range(0, len(list), nItems):
        yield list[i:i + nItems]
