/**
 * 定义事件类
 */
function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] === "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            const handlers = this.handlers[event.type];
            handlers.forEach((handler) => {
                handler(event);
            })
        }
    },
    removeHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array) {
            const handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
}

function NBA(player, team) {
    EventTarget.call(this);
    this.player = player;
    this.team = team;
}
/**
 * 指定NBA类原型为EventTarget.prototype，继承其原型方法。
 * 指定原型的构造函数是NBA
 */
NBA.prototype = Object.create(EventTarget.prototype, { constructor: NBA });
/**
 * PlayOff方法里解发go事件
 */
NBA.prototype.PlayOff = function () {
    this.fire({ type: "go", message: `i am ${this.player},just in ${this.team}` });
}
