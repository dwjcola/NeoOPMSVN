先将gen.bat中的
--pb_luaout=D:\code\NeoOPM\Assets\Resource_MS\LuaScripts\proto ^
--lua_out D:\code\NeoOPM\Assets\Resource_MS\LuaScripts\proto
两行改成自己的项目绝对路径

msg.proto中放的是proto数据，需要新的数据结构时要在此文件中定义，格式参考proto3，如果觉得写在一个文件中太乱，也可以按模块增加新的proto文件，但如果增加新的文件，需要修改
get.bat中第二行--protos msg.proto ^ 改为：--protos msg.proto,new.proto ^
OPM_push.rpc中定义所有server推给客户端的协议
OPM_request.rpc中定义所有request协议，协议规则：


service test_Handler_2000000{  //按模块增加service ，test_Handler为模块名称，没有实际意义，_2000000为此模块第一条协议（Test1）的协议Id，协议中rpc从上到下id一次递增
    rpc Test1(MessageTest2) returns (MessageTest) ;//pb--pb
    rpc Test2() returns (MessageTest) ;//void--pb
    rpc Test3(int32) returns (MessageTest) ;//buildin--pb
    rpc Test4(MessageTest2) returns (int32) ;//pb--buildin
    rpc Test5() returns (int32) ;//void--buildin
    rpc Test6(int32) returns (int32) ;//-buildin--buildin
}


例：rpc Test1(MessageTest2) returns (MessageTest) ;
Test1为协议名，没有实际意义，但不可重复，MessageTest2为 client->server的参数，MessageTest为server->client的参数
参数支持类型：
1、.proto文件中定义的类型（使用时要将proto文件import进来如：import "msg.proto";）
2、基本数据类型：uint32, uint64, bool, string, int32, int64，bytes, sint32, fixed32, sfixed32, sint64, sfixed64, double, float



注：service后缀的数字为该service下第一个rpc协议的id号，所有id不可重复，id为自增生成，因此调整顺序和删除需谨慎，要确保其生成的ID要和服务器的ID对应。