var WebSocketServer = require('ws');
var wss = new WebSocketServer.Server({
  port: 9088
});



//有人访问这个接口就会调用
wss.on('connection', function connection(ws, req) {
  // 客户端调用触发事件
  ws.on('message', function incoming(message) {
    var obj = JSON.parse(message)
    if (obj.subID == 1) {
      ws.subID = obj.subID;
      ws.userName = obj.name;
    } else {
      if (obj.status == 1) { //说明是针对个人发言
        wss.clients.forEach(element => {
          if (element.userName == obj.sendName || element.userName == obj.name) {
            var newobj = JSON.stringify(obj)
            element.send(newobj)
          }
        });

      } else { //针对群聊发言
        wss.clients.forEach(element => {
          var newobj = JSON.stringify(obj)
          element.send(newobj)
        });

      }
    }
  });
});