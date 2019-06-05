var WebSocketServer = require('ws');
var wss = new WebSocketServer.Server({
  port: 9088
});


//有人访问这个接口就会调用
wss.on('connection', function connection(ws, req) {

  // 客户端调用触发事件
  ws.on('message', function incoming(message) {
    wss.clients.forEach((client) => {
      client.send(message)
    })
  });
});

