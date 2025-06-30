const socket = io();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

let players = {};

socket.on('state', (gameState) => {
  players = gameState;
  draw();
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let id in players) {
    const player = players[id];
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, 50, 50);
  }
}

window.addEventListener('keydown', (e) => {
  socket.emit('move', e.key);
});