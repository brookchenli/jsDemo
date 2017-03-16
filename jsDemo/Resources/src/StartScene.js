/*****************************
 * 统一定义
 *CMD命令集合,CMD 和JSON详细看文档
 * 和两个接口定义
 */
JS_CMD ={
    //发送的命令
CMD_GETRESPATH:"COCOS_GET_RESOURCE_PATH", //获取APP的资源目录
CMD_UNZIPFLIE:"COCOS_UNZIP_RESOURCE", //将游戏OBB包内指定文件解压到指定路径中
CMD_SHOWDIALOG:"COCOS_SHOW_DIALOG",//显示/关闭异常对话框
CMD_STARTENGINE:"COCOS_START_ENGINE", //开始游戏引擎
CMD_PAUSEENGINE:"COCOS_RESUME_ENGINE",//暂停游戏引擎
CMD_RESUMEENGINE:"COCOS_RESUME_ENGINE",//继续游戏引擎
CMD_STOPENGINE:"COCOS_STOP_ENGINE",//停止游戏引擎
CMD_GETCHECKSTATE:"COCOS_GET_CHECK_STATE",//获取游戏引擎状态
CMD_READMINDVALUE:"COCOS_READ_MIND_VALUE",//读取引擎参数
CMD_SETMINDTYPE:"COCOS_SET_MIND_TYPE",//设置引擎参数
CMD_SETTRAININGSOCRE:"COCOS_SET_TRAINING_SCORE",//设置训练得分
CMD_SETSENSORTABLE:"COCOS_SET_SENSOR_TABLE",//设置心理算法表
CMD_GETSENSORTABLE:"COCOS_GET_SENSOR_TABLE",//获取心理算法表
CMD_GETINDEX:"COCOS_GET_INDEX",    //获取指数值
CMD_QUIT_GAME:"COCOS_QUIT_GAME",       //返回退出游戏
    
    //接收到的命令
BK_CG_CMD:"onError",  //传感器CMD
BK_CMD_LICKCHANGE:"onLinkChange",//通信连接状态改变回调
BK_CMD_BATTERY:"onBattery",// 电池电量改变回调
BK_CMD_PSYCHOLOGYSTATE:"onPsychologyState",//心理状态回调
BK_CMD_PSYCHOLOGYCHART:"onPsychologyChart",//心理实时曲线数据回调
BK_CMD_HEARTRATEDATA:"onHeartRateData",//平均心率回调回调
BK_CMD_STREESDATA:"onStressData",//压力指数回调回调
BK_CMD_RELAXDATA:"onRelaxData",//放松指数回调回调
BK_CMD_HRVDATA:"onHrvData",  //HRV心率变异指标 回调
BK_CMD_HRVVALIDATION:"onHRVValidation", //HRV有效性 回调
BK_CMD_REPROT:"onTrainingResult",  //训练报告 回调
BK_CMD_GAMEEXIT: "onGameExit"//接收到强制游戏退出指令
};

/************************
 * 游戏自定义监听器的一些变量
 * */
var GAME_LISTEN_EVENT = "event_game_status";
var GAME_PLAY_CMD_MSG ="bee_runaction_msg";
/**********************************
 *
 * 游戏自己的定义
 */

function engineCallback(cmd,content){
    //传递到场景监听器
    console.log("js get cmd =");
    cc.eventManager.dispatchCustomEvent(GAME_LISTEN_EVENT,{a:cmd,b:content});
};
//发送数据
function notifyJs(cmd,content){
    //调用JSB;
    
    if (cc.sys.os === cc.sys.OS_IOS) {
        var result = jsb.reflection.callStaticMethod("ViewController","js2Native:withContent:",cmd,content);
        return result;
    }
    else if (cc.sys.os === cc.sys.OS_ANDROID) {
        var result =  jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "js2Native", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", cmd, content);
        return result;
    }
    /*
     var result =  jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "js2Native", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", cmd, content);
     return result;
     */
};

var StartLayer = cc.Layer.extend({
                                 helloLabel:null,
                                 bg_sprite:null,
                                 ctor:function(){
                                 this._super();
                                 var size=cc.winSize;

                                 this.bg_sprite = new cc.Sprite(res.bg_png);
                                 this.bg_sprite.attr({
                                                     x: size.width / 2,
                                                     y: size.height / 2
                                                     });
                                 this.addChild(this.bg_sprite, 0);
                                 
                                 var get_path = notifyJs(JS_CMD.CMD_GETRESPATH,"");
                                 console.log("GET_RES_PATH="+get_path);
                                 
                                 this.helloLabel = new cc.LabelTTF("Hello World", "", 38);
                                 this.helloLabel.x = size.width /2-100;
                                 this.helloLabel.y = size.height/2+200;
                                 this.addChild(this.helloLabel);
                                 
                                 var startItem = new cc.MenuItemImage.create(
                                                                      res.Start_N_png,
                                                                      res.Start_S_png,
                                                                      function () {
                                                                        console.log("xxxx");
                                                                             notifyJs(JS_CMD.CMD_GETRESPATH,"");
                                                                      }, this);
                                 startItem.attr({
                                                x: size.width/2,
                                                y: size.height/2,
                                                anchorX: 0.5,
                                                anchorY: 0.5
                                                });
                                 
                                 var menu = new cc.Menu(startItem);
                                 menu.x = 0;
                                 menu.y = 0;
                                 this.addChild(menu, 1);
                                 
                                 
                                 /*
                                 var item1 = new cc.MenuItemFont("cmd1", this.menuItem1Callback, this);
                                 var item2 = new cc.MenuItemFont("cmd2", this.menuItem2Callback, this);
                                 var item3 = new cc.MenuItemFont("cmd3", this.menuItem2Callback, this);
                                 var item4 = new cc.MenuItemFont("cmd4", this.menuItem2Callback, this);
                                 var item5 = new cc.MenuItemFont("cmd5", this.menuItem2Callback, this);
                                 var item6 = new cc.MenuItemFont("cmd6", this.menuItem2Callback, this);
                                 
                                 var mm = new cc.Menu(item1, item2, item3, item4, item5, item6);
                                 mm.alignItemsVertically();
                                 
                                 this.addChild(mm);
                                 
                                 var P_this = this;
                                 */
                                 
                                 
                                 var game_listener = cc.EventListener.create({
                                                                             event:cc.EventListener.CUSTOM,
                                                                             eventName:"event_game_status",
                                                                             callback:function (event) {
                                                                                var CMD_BK = event.getUserData().a;
                                                                                P_this.g_status = 1;
                                                                                console.log("i am here");
                                                                                P_this.helloLabel.setString(CMD_BK);
                                                                             
                                                                             }
                                                                             });
                                 
                                 cc.eventManager.addListener(game_listener,-1);
                                 
                                 return true;
                                 },
                                 
                                 menuItem1Callback:function(sender){
                                 this.helloLabel.text = "get msg";
                                    console.log("cmd");
                                 },
                                 
                                menuItem2Callback:function(sender){
                                    console.log("cmd1");
                                 }
                                 
                                 });

var StartScene = cc.Scene.extend({
                                 onEnter:function(){
                                 this._super();
                                 var layer = new StartLayer();
                                 this.addChild(layer);
                                 
                                 }
});
