var WebSocketServer = require('ws');
var wss = new WebSocketServer.Server({
  port: 9088
});

function heartbeat() {
  this.isAlive = true;
}

//有人访问这个接口就会调用
wss.on('connection', function connection(ws, req) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  // 客户端调用触发事件
  ws.on('message', function incoming(message) {
    ws.username = JSON.parse(message).username
    wss.clients.forEach((client) => {
      client.send(message)
    })
  });
});

// 定时循环判断是不是前端还在运行
const interval = setInterval(function ping() {
  var arr = []
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      arr.push(ws.username)
      // 关闭这个通信
      ws.terminate();
    }
    ws.isAlive = false;
    // 触发pong事件
    ws.ping();
  });
  // 离开的用户给每一个剩余的用户通知一下
  if (arr.length > 0) {
    arr.forEach(el => {
      wss.clients.forEach(function each(ws) {
        ws.send(JSON.stringify({
          status: 0,
          message: el + "离开了直播间",
          name: ''
        }))
      })
    })
  }
}, 15000);