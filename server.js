const express = require('express');
const app = express();
const WebSocketServer = require('ws').Server;
const url = require('url')
wss = new WebSocketServer({port: 8000})
app.listen(3000, function(){
    console.log('listen on Port 3000');
    console.log('-------------------')
})

var Index = ['0']
var wsArray = {};

wss.on('connection', function(ws, req){
    const location = url.parse(req.url);
    const name = location.path.substring(1);
    ws.send('Hello, ' + name);

    for (var i = 0; i <= Index.length; i++){
        if(!Index[i]){
            Index[i] = i;
            ws.id = i;
            ws.name = name;
            wsArray[ws.id] = ws;
            break;
        }
    }

    ws.on('message', function(mes){
        ws.send(mes);
    })

    for (var i = 1; i<=Index.length-1 ; i++){
        if(i!=ws.id){
            wsArray[i].send(name + ' 加入聊天室：' + new Date().toLocaleString());
        }
    }

    ws.on('close', function(){
        for (var i = 1 ; i <= Index.length-1 ; i++){
            if(i!=ws.id){
                wsArray[i].send(ws.name + ' 離開聊天室：' + new Date().toLocaleString())
            }
        }
    })
})