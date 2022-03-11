# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


import os
import sys

import excelHandle.Global as g
import excelHandle.excelHandleMain as excelHandleMain
import excelHandle.pathutil as pathutil

# pObj = pathutil.pathutil()

if __name__ == '__main__':


  # print("当前路径：" + os.getcwd())
  # print("上级路径：" + os.path.abspath(os.path.dirname(os.getcwd())))
  # print("上上级路径：" + os.path.abspath(os.path.join(os.getcwd(), "../..")))

  g._ori_configPath = os.getcwd() + "\\"

  g._ori_out_configPath =  sys.argv[1]

  print("输入路径：" + g._ori_configPath)

  print("输出路径：" + g._ori_out_configPath)

  excelHandleMain.start()

input('please input any key to exit')










