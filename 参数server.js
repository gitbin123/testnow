var WebSocketServer = require('ws');
var wss = new WebSocketServer.Server({
  port: 9088,
  path: '/name', //只接受与路径匹配的链接
  maxPayload: 999, //最大消息负载
});

// host {String} 要绑定的服务器主机名
// port {Number} 要绑定的服务器端口
// backlog {Number} 挂起连接队列的最大长度.
// server {http.Server|https.Server} 一个预创建的HTTP/S服务器
// verifyClient {Function} 验证传入连接的函数。
// handleProtocols {Function} 处理子协议的函数。
// path {String} 只接受与此路径匹配的连接
// noServer {Boolean} 启用无服务器模式
// clientTracking {Boolean} 是否记录连接clients
// perMessageDeflate {Boolean|Object} 开启关闭zlib压缩(配置)
// maxPayload {Number} 最大消息载荷大小（bytes）




//有人访问这个接口就会调用
wss.on('connection', function connection(ws, req) {
  // 获得访问的电脑的ip
  const ip = req.connection.remoteAddress;
  // 客户端调用触发事件
  ws.on('message', function incoming(message) {
    wss.clients.forEach((client) => {
      client.send(message + "lalaa")
    })
  });
});