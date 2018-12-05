
### 作用域和闭包

* 立即执行函数表达式

```javascript
    var a = 2;
    (function foo() {
        var a = 3;
        console.log( a ); // 3
    })();

```

>由于函数被包含在一对 ( ) 括号内部，因此成为了一个<font color=#0099ff face="黑体">函数表达式</font>，通过在末尾加上另外一个( ) 可以>立即执行这个函数，比如 (function foo(){ .. })() 。第一个 ( ) 将函数变成表达式，第二个 >( ) 执行了这个函数。所以控制台输入这段代码，会立即打印出3。

* 带参数的立即函数
  
```javascript
    var a= '全局作用域';
    ;(
        function(def){
            def(window);
        }
    )(function def(global){
        var a = '局部作用域';
        console.log(a);
        console.log(global.a);
    });

```
>函数表达式 def 定义在片段的第二部分，然后当作参数（这个参数也叫作 def ）被传递进
>IIFE 函数定义的第一部分中。最后，参数 def （也就是传递进去的函数）被调用，并将
>window 传入当作 global 参数的值。封装在立即函数中的变量不会被外部函数访问到，从而避免与其它代码相冲突。 

***   
<br>

* 函数声明和函数表达式

```javascript
    //函数声明
    function funDeclaration(){
        console.log('this is fun Declaration')
    }
```

```javascript
    //函数表达式
    var funExpression = function (){
        console.log('this is fun Expression');
    }
```
>Javascript 中函数声明和函数表达式是存在区别的，函数声明在JS解析时进行函数提升，因此在同一个作用域内，不管函数声明在哪里定义，该函数都可以进行调用。而函数表达式的值是在JS运行时确定，并且在表达式赋值完成后，该函数才能调用。

>同理，js引擎会在解释 JavaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的变量和函数的声明，使之在任何代码被执行前首先被处理，这个过程叫做提升。函数会首先被 提升，其次是变量。而变量的表达式和函数表达式则在运行时执行。
```javascript
    a = 2;
    bar();
    function bar(){
        return a;
    }
    var a ;
```
>将变量a的声明放在最下面，但程序执行依然会输出2。即变量声明提升到代码最上面，然后执行a=2。


```javascript
    //再举例
    foo(); // 1
    var foo;
    function foo() {
        console.log( 1 );
    }
    foo = function() {
        console.log( 2 );
    };

    //js引擎解析后实际是这样执行的
    function foo() {
        console.log( 1 );
    }
    foo(); // 1
    foo = function() {
        console.log( 2 );
    };
```
>后者var foo是重复的声明被忽略，覆盖。实际开发中应避免混乱的代码。

***   
<br>

* 作用域，this，call
```javascript
    function fun(num) {
        console.log("fun: " + num);
        // 记录 foo 被调用的次数
        this.count++;
    }
    fun.count = 0;
    var i;
    for (i = 0; i < 10; i++) {
        if (i > 5) {
            fun(i);
        }
    }
    // foo: 6
    // foo: 7
    // foo: 8
    // foo: 9
    // foo 被调用了多少次？
    console.log(fun.count); // 0
```
>运行结果，最后输出count=0,非程序预期的4。fun函数里打印出this，实际指向的是window，此时相当于创建了一个全局的变量count，最后调用fun.count时，它的值还是定义时的0。


##### 解决方法一是强制this指向fun
```javascript
    function fun(num) {
        console.log("fun: " + num);
        // 记录 foo 被调用的次数
        this.count++;
    }
    fun.count = 0;
    var i;
    for (i = 0; i < 10; i++) {
        if (i > 5) {
            fun.call(fun, i);
        }
    }
    //***以下省略
```

##### 解决方法二是fun标识符代替this引用函数对象
```javascript
    function fun(num) {
        console.log("fun: " + num);
        // 记录 foo 被调用的次数
        fun.count++;
    }
    fun.count = 0;
    var i;
    for (i = 0; i < 10; i++) {
        if (i > 5) {
            fun.call(fun, i);
        }
    }
    ***以下省略
```

***   
<br>

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
***
<br>


* Javascript数组去重 array.reduce方法
  
```javascript
function() {
      let array = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
      let result = array.sort().reduce(function(accumulator, currentValue) {
        var length = accumulator.length;
        if (length === 0 || accumulator[length - 1] !== currentValue) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);
      console.log(result);
    }
```
