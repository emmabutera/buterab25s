// Set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Utility function to get random value
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
  this.exists = true;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

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

// EvilCircle constructor
function EvilCircle(x, y) {
  this.x = x;
  this.y = y;
  this.velX = 20;
  this.velY = 20;
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

EvilCircle.prototype.setControls = function () {
  window.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velY;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
  });
};

EvilCircle.prototype.checkCollision = function () {
  for (const ball of balls) {
    if (ball.exists) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        ball.exists = false;
      }
    }
  }
};

// Create ball array and EvilCircle instance
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

const evil = new EvilCircle(width / 2, height / 2);
evil.setControls();

// Animation loop
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  let ballCount = 0;

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ballCount++;
    }
  }

  evil.draw();
  evil.checkCollision();

  document.querySelector('.ball-count').textContent = ballCount;

  requestAnimationFrame(loop);
}

loop();
