; (function (global, factory) { 
    (typeof exports === 'object' && typeof module !== undefined) ? (module.exports = factory()) : (typeof define === 'function' && define.amd) ? (define(factory)) : (global.particle = factory())
    }(this, function () {
    function Particle(options) {
        this.options = { 
            el: 'body', 
            startX: 0, 
            startY: 0, 
            num: 100, 
            shape: 0.1, 
            isMouseEvent: false 
        }
        Object.assign(this.options, options)
        this.createCanvas()
    }
    Particle.prototype = {
        constructor: Particle, 
        createCanvas() {
            this.el = document.querySelector(this.options.el)
            if (!document.querySelector(`${this.options.el} canvas`)) { 
                this.el.insertBefore(document.createElement('canvas'), this.el.firstChild) 
            }
            this.canvas = document.querySelector(`${this.options.el} canvas`)
            this.ctx = this.canvas.getContext('2d')
            if (this.options.el === 'body') {
                this.canvas.width = window.innerWidth
                this.canvas.height = window.innerHeight
            } else {
                this.canvas.width = this.el.getBoundingClientRect().width
                this.canvas.height = this.el.getBoundingClientRect().height
            }
        }, 
        init() {
            this.x = this.options.startX || this.randomDigit(0, this.canvas.width)
            this.y = this.options.startY || this.randomDigit(0, this.canvas.height)
            this.size = 1.3
            this.grow = 0.01
            this.color = `#${Math.random().toString().slice(-6)}`
            this.angle = this.randomDigit(0, Math.PI * 2, false)
            this.angleX = Math.sin(this.angle) * this.size
            this.angleY = Math.cos(this.angle) * this.size
        }, 
        draw() {
            this.ctx.beginPath()
            this.ctx.fillStyle = this.color
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            this.ctx.fill()
            this.update()
        }, 
        update() {
            this.size += this.grow
            this.resize = this.size
            this.angleX = Math.sin(this.angle) * this.resize
            this.angleY = Math.cos(this.angle) * this.resize
            this.x += this.angleX
            this.y += this.angleY
            if (this.x >= this.canvas.width || this.x <= 0 || this.y >= this.canvas.height || this.y <= 0) { 
                this.init() 
            }
        }, 
        randomDigit(min, max, flag = true) { 
            return flag ? parseInt(Math.random() * (max - min) + min) : parseFloat(Math.random() * (max - min) + min) 
        }, 
        createParticle() {
            this.part = []
            for (let i = 0; i < this.options.num; i++) {
                this.part[i] = new Particle(this.options)
                this.part[i].init()
            }
        }, 
        renderParticle() {
            let _this = this; 
            (function redraw() {
                _this.ctx.fillStyle = `rgba(0, 0, 0, ${_this.options.shape})`
                _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height)
                for (let i = 0; i < _this.options.num; i++) { 
                    _this.part[i].draw() 
                }
                requestAnimationFrame(redraw)
            }());
        }, 
        mouseEvent() {
            if (this.options.isMouseEvent) {
                this.el.addEventListener('mousemove', e => {
                    let x = e.clientX - this.canvas.offsetLeft + window.scrollX; 
                    let y = e.clientY - this.canvas.offsetTop + window.scrollY; 
                    if (x <= this.canvas.width && y <= this.canvas.height) {
                        for (let i = 0; i < this.options.num; i++) {
                        this.part[i].options.startX = x
                            this.part[i].options.startY = y
                        }
                    }
                })
            }
        }, 
        colorfulAnimation() { 
            this.createParticle(); 
            this.mouseEvent(); 
            this.renderParticle(); 
        }
    }
    return function particle(options) { 
        return options ? new Particle(options).colorfulAnimation() : new Particle().colorfulAnimation() 
    }
}))