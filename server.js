const express = require('express');
const app = express();
const env = require('dotenv');
const {Server} = require('socket.io')
const http = require('http');
const { Socket } = require('dgram');

const server = http.createServer(app);
env.config();


app.get('/',(req,res)=>{
    console.log(__dirname);
    res.sendFile(__dirname+'/index.html');
const io = new Server(server);
io.on('connection',(Socket)=>{
    console.log('client connected',Socket.id);
    Socket.on('disconnect',()=>{
        console.log('client disconnected',Socket.id);
    })
})
Socket.on('clientevent',(payload)=>{
    console.log('clientpayload',payload);
    io.emit('serverevent',payload);
})
})



let port = process.env.PORT;
app.listen(port,()=>{
    console.log(`the process is running on port no`,port)
})

