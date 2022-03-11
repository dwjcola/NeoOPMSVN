#coding=utf-8
from Core.BaseCase import BaseCase

class Arena_RobotCase(BaseCase):
    """
    Arena_Robot表检查 1、id不能重复
    """
    def run(self):
        self.add_depends('Arena_Robot')
        Arena_Robot = self._Arena_Robot
        self.tag_repeat(Arena_Robot,'id')