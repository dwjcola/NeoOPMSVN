import colorama
 
colorama.init(autoreset=True)
def log(data):
    print(data)

def logError(st):
    print('\033[1;31m {0} \033[0m'.format(st))
    # print(f'\033[31m'+str(st)+'\033[0m')

def logWarning(st):
    print('\033[1;33m {0} \033[0m'.format(st))
    # print(f'\033[33m'+str(st)+'\033[0m')