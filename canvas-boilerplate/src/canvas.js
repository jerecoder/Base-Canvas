
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth - 4;
canvas.height = innerHeight - 4;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#00ADB5', '#FFF4E0', '#F8B500', "#FC3C3C"];

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

// Objects
function Particle(x, y, velocity, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
}

Particle.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.fillStyle = this.color;
    c.fill()
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
}

Particle.prototype.update = function () {
  this.draw();
}

// Implementation
let particles;
function init() {


    particles = []

    for (let i = 0; i < 300; i++) {
        const radius = 20;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let mass = randomIntFromRange(1, 5);
        const color = randomColor(colors);
        particles.push(new Particle(x, y, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
    }
}

init();
animate();
