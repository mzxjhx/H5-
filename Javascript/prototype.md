#### 原型风格的继承

```javascript
    function Foo(name) {
        this.name = name;
    }
    Foo.prototype.myName = function () {
        return this.name;
    };
    function Bar(name, label) {
        //call方法继承Foo属性
        Foo.call(this, name);
        this.label = label;
    }
    // 我们创建了一个新的 Bar.prototype 对象并关联到 Foo.prototype
    Bar.prototype = Object.create(Foo.prototype);

    // Bar.prototype.constructor这个属性需要手动指定
    Bar.prototype.myLabel = function () {
        return this.label;
    };
    var a = new Bar("a", "obj a");
    a.myName(); // "a"
    a.myLabel(); // "obj a

```

##### 之前经常使用这种错误写法，Bar.prototype 直接引用 Foo.prototype 对象，给Bar.prototype添加新对象时，会直接修改Foo.prototype

```javascript

    Bar.prototype = Foo.prototype;

    Bar.prototype.say = function () { return 123 }

    //控制台打印Foo.prototype
    //myName:f()
    //say:f()

```

#### 另外一个继承举例
```javascript
    function Animal(name) {
        this.name = name;
    }

    Animal.prototype.getName = function () {
        return this.name;
    }

    function Dog(name, age) {
        Animal.call(this, name);
        this.age = age || 1;
    }

    //同时设置prototype.constructor=Dog
    Dog.prototype = Object.create(
                                    Animal.prototype,
                                    { 
                                        constructor: Dog
                                    }
                                );
    Dog.prototype.menow = function () {
        return `${this.getName()} ewfefe i am at age of ${this.age} ;`
    }
```