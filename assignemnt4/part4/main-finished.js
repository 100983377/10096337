// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const counter = document.createElement("p");
counter.style.position = "absolute";
counter.style.top = "10px";
counter.style.left = "10px";
counter.style.color = "white";
counter.style.fontSize = "20px";
document.body.appendChild(counter);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX || 1;
    this.velY = velY || 1;
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    if (!this.exists) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls) {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = 20;
    this.velY = 20;
    this.color = "white";
    this.size = 15;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x - this.size <= 0) {
      this.x = this.size;
    }
    if (this.x + this.size >= width) {
      this.x = width - this.size;
    }
    if (this.y - this.size <= 0) {
      this.y = this.size;
    }
    if (this.y + this.size >= height) {
      this.y = height - this.size;
    }
  }

  setControls() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  collisionDetect(balls) {
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
  }
}

const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7) || 1,
    random(-7, 7) || 1,
    randomRGB(),
    size
  );
  balls.push(ball);
}

const evilCircle = new EvilCircle(width / 2, height / 2);
evilCircle.setControls();

function updateCounter() {
  const remainingBalls = balls.filter(ball => ball.exists).length;
  counter.textContent = `Balls Remaining: ${remainingBalls}`;
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls);
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect(balls);

  updateCounter();

  requestAnimationFrame(loop);
}

loop();
