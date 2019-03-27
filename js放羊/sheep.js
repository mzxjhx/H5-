(function () {
    var obj = { 
        frequency: 70, 
        stage: document.getElementsByClassName('stage')[0], 
        num: 0, 
        cot: 0, 
        speed: 7, 
        maxSheep: 8 
    }
    function Sheep(data) {
        this.sheep = document.createElement('div'); 
        data.stage.appendChild(this.sheep); 
        this.stage = data.stage; 
        this.sheep.className = 'sheep'; 
        this.frequencyNum = Math.floor(Math.random() * data.frequency) + 30; 
        console.log(this.frequencyNum)
        this.sheepWith = this.sheep.offsetWidth; 
        this.sheepLeft = this.sheep.offsetLeft; 
        this.cot = data.cot; this.num = data.num; 
        this.speed = data.speed; 
        this.top = 0;
    }
    init(); 
    function init() { 
        cteatSheep(); 
    }
    function cteatSheep() { 
        var timer = setInterval(function () { 
            var sheepNum = obj.stage.children.length; 
            if (sheepNum > obj.maxSheep - 1) { 
                return false; 
            } else { 
                var sheep = new Sheep(obj); 
                sheepRun(sheep); 
            } 
        }, 1500) 
    }
    function sheepRun(sheep) {
        var sheepAnimate = setInterval(function () {
            sheep.num = sheep.num + sheep.sheepWith; 
            if (sheep.num == (sheep.sheepWith * 8)) { 
                sheep.num = 0; 
            }
            sheep.sheep.style.backgroundPosition = -sheep.num + 'px ' + sheep.top + 'px';
        }, sheep.frequencyNum); 
        var sheepRun = setInterval(function () {
            sheep.cot = sheep.sheep.offsetLeft - sheep.speed; 
            if (sheep.cot <= -sheep.sheepWith) { 
                clearInterval(sheepRun); 
                clearInterval(sheepAnimate); 
                sheep.stage.removeChild(sheep.sheep); 
            }
            sheep.sheep.style.left = sheep.cot + 'px';
        }, sheep.frequencyNum)
        sheep.sheep.addEventListener('mousedown', function (e) {
            var event = event || e; 
            sheep.top = -128; 
            sheep.speed = 0; 
            sheep.x = event.pageX; 
            sheep.y = event.pageY; 
            document.addEventListener('mousemove', sheepMove)
            function sheepMove(e) { 
                var event = event || e; 
                sheep.sheep.style.left = sheep.sheep.offsetLeft + (event.pageX - sheep.x) + 'px'; 
                sheep.sheep.style.top = sheep.sheep.offsetTop + (event.pageY - sheep.y) + 'px'; 
                sheep.x = event.pageX; sheep.y = event.pageY; 
            }
            sheep.sheep.addEventListener('mouseup', function (e) { 
                var event = event || e; 
                sheep.top = 0; 
                sheep.speed = obj.speed; 
                document.removeEventListener('mousemove', sheepMove) 
            })
        });
    }
})()