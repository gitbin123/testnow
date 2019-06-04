const http = require('http');
const WebSocket = require('ws');
const url=require("url")
 
const server = http.createServer();
const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });


function person(name,arr,size){
  arr.forEach(element => {
    element.send(JSON.stringify({name:name,line:size}))
  });
}
 
wss1.on('connection', function connection(ws) {
  person("wss1",wss1.clients,wss1.clients.size)
});
 
wss2.on('connection', function connection(ws) {
  person("wss2",wss2.clients,wss2.clients.size)
});
 
server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;
//  判断哪一个接口
  if (pathname === '/foo') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/bar') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});
 
server.listen(9088);