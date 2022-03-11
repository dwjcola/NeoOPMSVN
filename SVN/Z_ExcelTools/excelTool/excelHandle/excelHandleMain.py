from cmath import nan
import os
from numpy import NaN
import pandas as pd
import math
import excelHandle.Global as g
import excelHandle.logger as logger
import re
oneTableMaxLen = 100
useSplit_lua = True
useSplit_json = False
keyTitle = "Key"
dataValueIndex = 4
listNewTable = []


def start():
    # getAllPath(g._configRoot)
    # print("g._ori_configPath == " + g._ori_configPath)
    excelFiles = getAllPath(g._ori_configPath)
    if True :
        toLua(excelFiles)
        delateExcel()
    else:
        toJson(excelFiles)

def getAllPath(rootPath):
    result = []
    for maindir, subdir, file_name_list in os.walk(rootPath):
        for filename in file_name_list:
            if isSuffixFile(filename,".xlsx"):
               apath = os.path.join(maindir, filename)
               result.append(apath)
    return result
def isSuffixFile(filePath,suffix):
    fileName = filePath.split('\\')[-1]
    fileName = fileName.split('/')[-1]
    return os.path.splitext(filePath)[1] == suffix and fileName.find('~$') == -1 and fileName[0] != '.'

def toJson(excelFiles):
    print("to do json")

# -----------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------
# ----------------------------------- lua -------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------
def toLua(excelFiles):
    for excelFile in excelFiles:
        try:
            df = pd.read_excel(excelFile, sheet_name=None)
        except:
            logger.logError('{0}读取失败'.format(excelFile))
            continue

        # handleSheet_lua(pd.read_excel(excelFile, sheet_name="Dete_test1"),"Dete_test1")

        for sheetName in df.keys():
            handleSheet_lua(pd.read_excel(excelFile, sheet_name=sheetName),sheetName)

# 获取 第一个Key 关键字所在得 行索引
def getKeyIndex(df,sheet_name):
    headIndex = -1
    for h_index in range(df.shape[0]):
        if keyTitle == df.iloc[h_index, 0]:
            headIndex = h_index
            break
    if headIndex == -1:
        logger.logError(sheet_name + " 表 没有 key ")
    return headIndex

def getAllIDs_lua(df, firstIndex):
    return df.iloc[(firstIndex + 4):df.shape[0],0]

def getAllAtts_lua(df, firstIndex):
    return df.iloc[firstIndex + 3]

def getAllcs_lua(df, firstIndex):
    return df.iloc[firstIndex]

def getAllDataType_lua(df, firstIndex):
    return df.iloc[firstIndex + 1]

def isSpecial_lua( sheet_name):
    return sheet_name == "Date_Setting"

def handleNoSliteSheet_lua( df,sheet_name,headIndex,idS):
    atts = getAllAtts_lua(df, headIndex)

    css = getAllcs_lua(df, headIndex)

    dataTypes = getAllDataType_lua(df, headIndex)

    idIndex_all = 0
    idIndex_spilt = 0
    nameIndex = 1

    fileName = sheet_name

    lua_str = "local data = {\n"


    for id in idS:
        idIndex_all += 1
        idIndex_spilt += 1
        if idIndex_spilt > oneTableMaxLen:
            lua_str = "{0}".format(lua_str) + " \n}\n return data"
            writeFile_lua(fileName, lua_str)
            idIndex_spilt = 1
            nameIndex += 1
            fileName = getFileName_lua(sheet_name, nameIndex)

            lua_str = "{"

        con = df.iloc[idIndex_all + 3]
        conVal_index = 0
        one_row = "[{0}] = ".format(getValueByType_lua(dataTypes[conVal_index], id,sheet_name,id)) + "{"
        for val in con:
            cs_v = css[conVal_index]
            attName_v = atts[conVal_index]
            dataType_v = dataTypes[conVal_index]

            if not pd.isna(cs_v) \
                    and (cs_v == "c" or cs_v == "C" or cs_v == "cs" or cs_v == "CS" or cs_v == "cS" or cs_v == "Cs" or cs_v == "Key")\
                    and not pd.isna(val) and (not cs_v.isspace()) :
                if conVal_index == 3 and isSpecial_lua(sheet_name):
                    dataType_v = con[2]
                one_row = "{0}{1} = {2},\n".format(one_row, attName_v, getValueByType_lua(dataType_v, val,sheet_name,id))
            conVal_index += 1
        one_row = "{0} ".format(one_row) + "},\n"
        lua_str = "{0} {1}".format(lua_str, one_row)
        # writeFile_lua(fileName)
    lua_str = "{0} ".format(lua_str) + "\n}\n return data"
    writeFile_lua(fileName, lua_str)

def handleSliteSheet_lua( df,sheet_name,headIndex,idS):

    atts = getAllAtts_lua(df, headIndex)

    css = getAllcs_lua(df, headIndex)

    dataTypes = getAllDataType_lua(df, headIndex)

    idIndex_all = 0
    idIndex_spilt = 0
    nameIndex = 1
    cannotrun = 0


    fileName = getFileName_lua(sheet_name, nameIndex)

    lua_str = "local data = {\n"

    lua_str_m = "local data = {\n"
    lua_str_m = "{0}'{1}',\n".format(lua_str_m, fileName)
    for id in idS:
        if cannotrun:
            break
        idIndex_all += 1
        idIndex_spilt += 1
        if idIndex_spilt > oneTableMaxLen:
            lua_str = "{0}".format(lua_str) + " \n}\n return data"
            writeFile_lua(fileName, lua_str)
            idIndex_spilt = 1
            nameIndex += 1
            fileName = getFileName_lua(sheet_name, nameIndex)
            lua_str_m = "{0}'{1}',\n".format(lua_str_m, fileName)
            lua_str = "local data = {\n"

        con = df.iloc[idIndex_all + 3]
        conVal_index = 0
        one_row = "[{0}] = ".format(getValueByType_lua( dataTypes[conVal_index], id,sheet_name,id)) + "{"
        for val in con:
            try:
                cs_v = css[conVal_index]
                attName_v = atts[conVal_index]
                dataType_v = dataTypes[conVal_index]
            except Exception as e:
                logger.logError('link行不能配置int，{0}导表失败'.format(fileName))
                cannotrun = 1
                break

            if not pd.isna(cs_v) \
                    and ( cs_v == "c" or cs_v == "C" or cs_v == "cs" or cs_v == "CS" or cs_v == "cS" or cs_v == "Cs" or cs_v == "Key") \
                    and not pd.isna(val) and (not cs_v.isspace()):
                if conVal_index == 3 and isSpecial_lua(sheet_name):
                    dataType_v = con[2]
                one_row = "{0}{1} = {2},\n".format(one_row, attName_v, getValueByType_lua(dataType_v, val,sheet_name,id))
            conVal_index += 1
        one_row = "{0} ".format(one_row) + "},\n"
        lua_str = "{0} {1}".format(lua_str, one_row)
        # writeFile_lua(fileName)
    lua_str = "{0} ".format(lua_str) + "\n}\n return data"
    lua_str_m += "\n}"
    lua_str_m = "{0} \n data.SPLIT_COUNT = {1} \n return data".format(lua_str_m,nameIndex)

    writeFile_lua(sheet_name, lua_str_m)
    writeFile_lua(fileName, lua_str)

def handleSheet_lua(df,sheet_name):
    if sheet_name.find("$") != -1:
        return
    logger.log("开始处理：" + sheet_name)
    headIndex = getKeyIndex(df,sheet_name)
    if headIndex == -1:
        return

    idS = getAllIDs_lua(df, headIndex)
    idlist = []
    for i in idS:
        try:
            if math.isnan(float(i)):
                break
        except :
            pass
        idlist.append(i)
    idS = idlist
    if len(idS) > oneTableMaxLen:
        handleSliteSheet_lua(df,sheet_name,headIndex,idS)
    else:
        handleNoSliteSheet_lua(df,sheet_name,headIndex,idS)



def getValueByType_lua(dataType,value,sheet_name,id):
    dataType = str(dataType)
    isArray = "array" in dataType
    dataType = dataType.replace('array',"")
    dataType = dataType.strip()
    if dataType == 'string':
        restlt = ""
        try:
            restlt = "'{0}'".format(str(value))
        except:
            logger.logError(str(sheet_name) + " :  "+ str(id) + "  ==> 类型： " + dataType + "  值： " + str(value) + "转换失败")
            return restlt
        else:
            return restlt
    elif dataType == "int":
        result = 0
        try:
            result = int(value)
        except:
            logger.logError(
                str(sheet_name) + " :  " + str(id) + "  ==> 类型： " + dataType + "  值： " + str(value) + "转换失败")
            return result
        else:
            return result
    elif dataType == "float":
        result = 0
        try:
            result = float(value)
        except:
            logger.logError(
                str(sheet_name) + " :  " + str(id) + "  ==> 类型： " + dataType + "  值： " + str(value) + "转换失败")
            return result
        else:
            return result
    elif re.findall(']',str(dataType)) and re.findall("\[",str(dataType)):
        result = "{}"
        try:
            dataType = str(dataType)
            dataType = dataType.strip()
            dataType = dataType.strip('[')
            dataType = dataType.strip(']')
            if re.findall(']', str(dataType)) and re.findall("\[", str(dataType)):
                logger.logError('嵌套数组 等待开发！！！')
                result = value
            else:
                dataList = dataType.split(',')
                if len(dataList) == 1:
                    value = str(value)
                    value = value.strip()
                    value = value.strip('[')
                    value = value.strip(']')
                    valueList = value.split(',')
                    tmpValue = "{"
                    for val in valueList:
                        tmpValue = "{0}{1},".format(tmpValue, getValueByType_lua(dataList[0], val, sheet_name,id))
                    tmpValue += "}"
                    result = tmpValue
                else:
                    value = str(value)
                    value = value.strip(',')
                    value += ","
                    value = value.replace('[', '')
                    value = value.strip()
                    valueList = value.split('],')
                    tmpTab = "{"
                    if isArray:
                        for tabstr in valueList:
                            if tabstr == "":
                                break
                            tab = tabstr.split(',')

                            tmpVal = "{"
                            index = 0
                            for val in tab:
                                tmpVal = "{0}{1},".format(tmpVal,
                                                          getValueByType_lua(dataList[index], val, sheet_name, id))
                                index += 1
                            tmpVal += "},"
                            tmpTab += tmpVal
                    else:
                        tab = valueList[0].split(',')
                        index = 0
                        for val in tab:
                            tmpTab = "{0}{1},".format(tmpTab,
                                                      getValueByType_lua(dataList[index], val, sheet_name, id))
                            index += 1
                    tmpTab += "}"
                    result = tmpTab
        except:
            logger.logError(str(sheet_name) + " :  "+ str(id) + "  ==> 类型： " + dataType + "  值： " + str(value) + "转换失败")
            return result
        else:
            return result

    else:
        logger.logError(str(sheet_name) + " 发现 未处理 数据类型 ！！！" + str(dataType))
        return value

def getFileName_lua(sheet_name,nameIndex):
    return "{0}_{1}".format(sheet_name,nameIndex)

def writeFile_lua(fileName,lua_str):
    if listNewTable.count(fileName) >= 1:
        logger.logError("出现重复表名 请检查数值表 ： " + fileName)
    else:
        listNewTable.append(fileName)

    f = open("{0}/{1}.txt".format(g._ori_out_configPath,fileName),'w',encoding = "utf-8")
    f.write(lua_str)
    f.close()
    # print("处理完成：" + fileName )

def delateExcel():
    result = getNowAllConfigFileName()
    for oldFileName in result:
        if listNewTable.count(oldFileName) <= 0:
            delatePath =  "{0}/{1}.txt".format(g._ori_out_configPath, oldFileName)
            if os.path.exists(delatePath):
                # 删除文件，可使用以下两种方法。
                os.remove(delatePath)
                # os.unlink(delatePath)
                # print("删除文件 "+ oldFileName)
            else:
                logger.logError("删除 文件不存在 ：" + delatePath)


def getNowAllConfigFileName():
    result = []
    for maindir, subdir, file_name_list in os.walk(g._ori_out_configPath):
        for filename in file_name_list:
            if isSuffixFile(filename, ".txt"):
                name_txt = os.path.split(filename)[1]
                name = name_txt.split(".")[0]
                result.append(name)

    return result