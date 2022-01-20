const app = require('express')();
const express = require('express')
const http = require('http').Server(app);
const path = require('path');
const { start } = require('repl');

const port = process.env.PORT || 3000;

const io = require("socket.io")(http, {
  cors: {
    origin: port,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
  });