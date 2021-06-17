const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('dotenv').config()

// for parsing application/json
app.use(express.json()); 

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true })); 

//GET for index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

//GET for users
app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/users.html');
})

//GET for chat
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
})

//POST for create-user
app.post('/create-user', (req, res) => {
    // var data = qs.parse(data)
    console.log("User cretaed: " + req.body.username)
    res.redirect('/chat?id=' + req.body.username);
})

io.on('connection', (socket) => {
    // console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        // console.log('message: ' + msg);
      });

    socket.on('disconnect', () => {
    //   console.log('user disconnected');
    });
  }); 

server.listen(process.env.PORT, () => {
  console.log('listening on *:3000');
});