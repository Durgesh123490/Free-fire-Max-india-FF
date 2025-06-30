const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

let players = {};

io.on('connection', (socket) => {
  players[socket.id] = {
    x: Math.random() * 500,
    y: Math.random() * 300,
    color: '#' + Math.floor(Math.random()*16777215).toString(16)
  };

  socket.on('move', (key) => {
    const player = players[socket.id];
    if (!player) return;
    if (key === 'ArrowUp') player.y -= 10;
    if (key === 'ArrowDown') player.y += 10;
    if (key === 'ArrowLeft') player.x -= 10;
    if (key === 'ArrowRight') player.x += 10;
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
  });
});

setInterval(() => {
  io.sockets.emit('state', players);
}, 1000 / 30);

http.listen(3000, () => {
  console.log('Listening on *:3000');
});