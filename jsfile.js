/* ======================
   Utils
====================== */
const deg = (a) => Math.PI / 180 * a
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1))

const opt = {
  particles: window.innerWidth > 300 ? 600 : 300,
  noiseScale: 0.009,
  angle: deg(-90),
  h1: rand(0, 360),
  h2: rand(0, 360),
  s1: rand(20, 90),
  s2: rand(20, 90),
  l1: rand(30, 80),
  l2: rand(30, 80),
  strokeWeight: 1.2,
  tail: 82
}

const particles = []
let time = 0


/* ======================
   Particle class
====================== */
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.lx = x
    this.ly = y
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.randomize()
  }

  randomize() {
    this.hueSeed = Math.random()
    this.hue = this.hueSeed > 0.5 ? 20 + opt.h1 : 20 + opt.h2
    this.sat = this.hueSeed > 0.5 ? opt.s1 : opt.s2
    this.light = this.hueSeed > 0.5 ? opt.l1 : opt.l2
    this.maxSpeed = this.hueSeed > 0.5 ? 3 : 2
  }

  update() {
    this.follow()

    this.vx += this.ax
    this.vy += this.ay

    const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2)
    const angle = Math.atan2(this.vy, this.vx)
    const capped = Math.min(this.maxSpeed, speed)

    this.vx = Math.cos(angle) * capped
    this.vy = Math.sin(angle) * capped

    this.x += this.vx
    this.y += this.vy

    this.ax = 0
    this.ay = 0

    this.edges()
  }

  follow() {
    const angle =
      noise(
        this.x * opt.noiseScale,
        this.y * opt.noiseScale,
        time * opt.noiseScale
      ) *
        Math.PI *
        0.5 +
      opt.angle

    this.ax += Math.cos(angle)
    this.ay += Math.sin(angle)
  }

  edges() {
  if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.lx = this.x
    this.ly = this.y
  }
}

  render() {
    stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`)
    line(this.x, this.y, this.lx, this.ly)
    this.lx = this.x
    this.ly = this.y
  }
}

/* ======================
   p5 setup
====================== */
function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight)
  canvas.parent('hero')
  strokeWeight(opt.strokeWeight)
  background(0)

  for (let i = 0; i < opt.particles; i++) {
    particles.push(
      new Particle(
        Math.random() * width,
        Math.random() * height
      )
    )
  }
}

/* ======================
   p5 draw
====================== */
function draw() {
  time++
  background(0, 100 - opt.tail)

  particles.forEach(p => {
    p.update()
    p.render()
  })
}

/* ======================
   Resize
====================== */
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight)
}
