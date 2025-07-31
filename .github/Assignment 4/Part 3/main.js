// Set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
const width = canvas.width;
const height = canvas.height;

// Function to get random number between two values
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Ball object constructor
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// Draw method for Ball
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// Create one test ball and draw it
const testBall = new Ball(100, 100, 4, 4, 'red', 30);
testBall.draw();
