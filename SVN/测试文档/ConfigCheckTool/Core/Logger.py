import json
import requests

def log(data):
    print(data)

def logError(st):
    print('\033[1;31m {0} \033[0m'.format(st))

def logWarning(st):
    print('\033[1;33m {0} \033[0m'.format(st))

def flyBook(message):
    url = 'https://open.feishu.cn/open-apis/bot/v2/hook/ce0dc2c7-1b5e-479c-a9f0-b8c2a53ee421'
    payload_message = {
    "msg_type": "text",
    "content": {
        "text": message
        }
    }
    headers = {
        'Content-Type': 'application/json'
    }

    requests.request("POST", url, headers=headers, data=json.dumps(payload_message))