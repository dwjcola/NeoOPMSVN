import asyncio,logging
from email.policy import default
from email import charset
import aiomysql
from attr import field

from orm import Model,StringField,IntegerField,ModelMetaclass

def log(sql,args=()):
    logging.info('SQL: %s'%sql)

async def create_pool(loop,**kw):
    logging.info('create database connection pool...')
    global __pool #声明全局变量__pool
    __pool = await aiomysql.create_pool(  #创建一个连接池
        host = kw.get('host','localhost'), #数据库服务器所在主机地址
        port = kw.get('port',3306), #服务器使用的端口
        user = kw['user'], #登录数据库的用户
        password = kw['password'], #对应用户名的密码
        db = kw['db'], #要使用的数据库
        charset = kw.get('charset','utf8'), #指定你想要的编码格式
        autocommit = kw.get('autocommit',True), #自动提交，默认是False
        maxsize = kw.get('maxsize',10), #池子里最大连接数量
        minsize = kw.get('minsize',1), #池子里最小连接数量
        loop = loop #异步循环事件的实例，或制定为None使用默认实例
    )

async def select(sql,args,size = None):
    log(sql,args)
    global __pool #全局变量__pool
    with (await __pool) as conn:
        cur = await conn.cursor(aiomysql.DictCursor) #初始化一个光标，DictCursor会让他返回一个dict
        await cur.execute(sql.replace('?','%s'),args or ()) #执行单条sql命令，mysql占位符是%s，sql是?所以替换
        if size:
            rs = await cur.fetchmany(size) #接收size条返回结果行
        else:
            re = await cur.fetchall() #接收全部返回
        await cur.close() #关闭光标
        logging.info('rows returned: %s'%len(rs))
        return rs

async def execute(sql,args):
    log(sql)
    with (await __pool) as conn:
        try:
            cur = await conn.cursor() #初始化一个光标，没传参数所以是默认的
            await cur.execute(sql.replace('?','%s'),args)
            affected = cur.rowcount #返回光标执行insert、update等命令影响行数，如果是select命令返回该语句返回的行数
            await cur.close()
        except BaseException as e:
            raise
        return affected

class User(Model):
    __table__ ='users'

    id = IntegerField(primary_key = True)
    name = StringField()

class Model(dict,metaclass = ModelMetaclass):
    def __init__(self,**kw):
        super(Model,self).__init__(**kw) #调用父类__init__

    def __getattr__(self,key): #用'.'引用的时候__dict__找不到就走__getattr__,这样'.'也能引用
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)

    def __setattr__(self, key, value): #可以[]引用。这样__getattr__()和__setattr__()确保可以[]引用也可以'.'引用
        self[key] = value

    def getValue(self,key):
        return getattr(self,key,None)

    def getValueOrDefault(self,key):
        value = getattr(self,key,None)
        if value is None:
            field = self.__mappings__[key]
            if field.default is not None:
                value = field.default() if callable(field.default) else field.default #三目运算，callable()用于检查对象是否可调用
                logging.debug('using default value for %s: %s'%(key,str(value)))
                setattr(self,key,value)
        return value

class Field(): #这地方python3里 Field() Field Field(object)是一样的

    def __init__(self,name,column_type,primary_key,default):
        self.name = name
        self.column_type = column_type
        self.primary_key = primary_key
        self.default = default
        
    def __str__(self) -> str: #print(Field)的时候会输出return值
        return '<%s,%s:%s>'%(self.__class__.__name__,self.column_type,self.name) #self.__class__ 指向类，self.__class__.__name__ 返回类名

class StringField(Field):

    def __init__(self, name = None, primary_key = False, default = None,ddl = 'varchar(100)'):
        super().__init__(name, ddl,primary_key, default)
class ModelMetaclass(type):
    # cls代表动态修改的类
    # name代表动态修改的类名
    # bases代表被动态修改的类的所有父类
    # attr代表被动态修改的类的所有属性、方法组成的字典
    def __new__(cls,name,bases,attrs):
        if name == 'Model': #排除Model本身，为什么暂时不知道
            return type.__new__(cls,name,bases,attrs)
        tableName = attrs.get('__table__',None) or name
        logging.info('found model: %s (table: %s)'%(name,tableName))
        mappings = dict() #创建一个空字典
        fields = []
        primaryKey = None
        for k,v in attrs.items(): #遍历取出cls的所有属性、方法的key value
            if isinstance(v,Field): #判断v是不是Field类或其子类
                logging.info('  found mapping: %s'%(k,v))
                mappings[k] = v
                # 找到主键
                if v.primary_key:
                    if primaryKey: #为true说明有一个主键了，主键重复了
                        raise RuntimeError('Duplicate primary key for field: %s'%k)
                    primaryKey = k #之前没有主键，把这个找到的主键赋值给primaryKey
                else:
                    fields.append(k)
        if not primaryKey:
            raise RuntimeError('Primary Key not found')
        for k in mappings.keys():
            attrs.pop(k)
        escaped_fields = list(map(lambda f:'`%s`'%f,fields))
        attrs['__mappings__'] = mappings #保存属性和列的映射关系
        attrs['__table__'] = tableName
        attrs['__primary_key__'] = primaryKey #主键属性名
        attrs['__fields__'] = fields #除主键外的属性名
        attrs['__select__'] = 'select `%s`,%s from `%s`' % (primaryKey,','.join(escaped_fields),tableName)






        