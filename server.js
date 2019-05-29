var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  port: 9088
});

function heartbeat() {
  this.isAlive = true;
}

function noop() {}
//有人访问这个接口就会调用
wss.on('connection', function connection(ws, req) {
  // ws.isAlive = true;
  // ws.on('pong', heartbeat);
  //在线的所有客户端
  var iparr = req.connection.remoteAddress.split(":");
  ip = iparr[iparr.length - 1]
  ws.ip = ip
  wss.clients.forEach((client) => {
    var ipsend = {
      status: 0,
      message: ip + "进入了直播间",
      name: ''
    }
    client.send(JSON.stringify(ipsend))
  })
  // 客户端调用触发事件
  ws.on('message', function incoming(message) {
    wss.clients.forEach((client) => {
      client.send(message)
    })
  });
});
// const interval = setInterval(function ping() {
//   var arr=[]
//   var index=0
//   wss.clients.forEach(function each(ws) {
//     if (ws.isAlive === false) {
//       arr.push(ws.ip)
//       index=1
//       ws.terminate();
//     }
//     ws.isAlive = false;
//     ws.ping(noop);
//   });
//   if(index==1){
//     wss.clients.forEach(function each(ws) {
//       ws.send(JSON.stringify({
//         status: 0,
//         message: arr[0] + "离开了直播间",
//         name: ''
//       }))
//     })
//   }
// }, 15000);