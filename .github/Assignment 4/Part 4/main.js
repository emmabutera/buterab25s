// Set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Ball constructor
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// Draw the ball
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// Update ball position and bounce off walls
Ball.prototype.update = function () {
  if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
    this.velX = -this.velX;
  }

  if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// Create multiple balls
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
    size
  );
  balls.push(ball);
}

// EvilCircle constructor
function EvilCircle(x, y) {
  this.x = x;
  this.y = y;
  this.velX = 20;
  this.velY = 20;
  this.color = 'white';
  this.size = 10;
}

// Draw method for EvilCircle
EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


// Animation loop
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
  }

  requestAnimationFrame(loop);
}

loop();

const evil = new EvilCircle(width / 2, height / 2);

// Update the animation loop to include the evil circle
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
    }
  }

  evil.draw(); // 👈 Draw the EvilCircle here

  requestAnimationFrame(loop);
}
