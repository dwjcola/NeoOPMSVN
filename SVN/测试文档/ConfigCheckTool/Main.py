#!/usr/bin/python3
#coding=utf-8
#author: cody

import time
from Core.Container import Container
from Core.Loader import Loader
import importlib
import os
import json
import sys

def init():
    current_path = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(current_path, "config.json")
    with open(config_path, "r") as f:
        content = f.read()
        config_json = json.loads(content)
    start = time.time()
    config_root = config_json["config_root"]
    report_root = config_json["report_root"]
    res_root = config_json["res_root"]
    Container.set_config("report_root", report_root)
    Container.set_config("res_root", res_root)
    loader = Loader(config_root)
    Container.set_loader(loader)

def main():
    init()
    Container.merge_translate()
    Container.merge_reward()
    start = time.time()
    print("cost:", time.time() - start)
    project_root = os.path.dirname(os.path.abspath(__file__))
    case_root = os.path.join(project_root, "Cases")
    # Container.test_one("Battle", "TestCase9")
    case_data = Container.run_case(case_root)
    Container.print_report(case_data)
    # Container.print_check()
    print("cost:", time.time() - start)

def check_self():
    init()
    config_root = "/Users/topjoy/data/vega/config/config"
    loader = Loader(config_root)
    loader.load_all()
    Container.print_check()

def test(category, clss):
    init()
    Container.merge_translate()
    Container.merge_reward()
    start = time.time()
    print("cost:", time.time() - start)
    Container.test_one(category, clss)    
    print("cost:", time.time() - start)

if __name__ == "__main__":
    # test("DreamerCase", "Arena_Reward_Rank_HighCase")
    main()
    # check_self()

    