
#### &emsp;Javascript的this可理解为绑定在作用域内的上下文执行对象。这种绑定分隐式绑定和显式绑定。this为属性或方法提供了一种优雅的调用方法，不必在function中指定其参数。
#### &emsp;要理解this的绑定过程，就要理解调用位置--函数在代码中被调用的地方，然后进一步回答这个this到底指向什么。有些编程方式会隐藏函数真正的调用位置

#### 举个多级this的隐式调用的例子，对象属性引用链中只有最顶层或者说最后一层会影响或决定其调用位置

```javascript
    function foo() {
        console.log(this.a);
    }
    var obj2 = {
        a: 42,
        foo: foo
    };
    var obj1 = {
        a: 2,
        obj2: obj2
    };
    obj1.obj2.foo(); 

    //42
    //这里this最终指向的是obj2

```
<br>

#### 这个例子中bar是obj.foo的一个引用，实际上指向的还是foo本身，foo的this指向window。

```javascript
    function foo() {
        console.log(this.a);
    }
    var obj = {
        a: 2,
        foo: foo
    };
    var bar = obj.foo; // 函数引用！
    var a = "oops, global"; // a 是全局对象的属性
    bar(); // "oops, global"
```
<br>

#### this的显式绑定

```javascript

    function fun(val){
        console.log(this.a, val);
        return this.a + val;
    }

    var obj = {
        a:123,
    }

    //通过apply绑定函数fun的this
    var runFun = function(){
        return fun.apply(obj, arguments);
    }

    var b = runFun(123);
    console.log(b); //printf 246

```
<br>


#### 这种绑定是硬绑定，相当于写死this=obj。应用中应创建一个代理，作为绑定的辅助函数

```javascript

    function toPlay(val) {
        console.log(this.year, val);
        return ` the ${this.year} ${val} playoff `;
    }

    //通过apply绑定函数fun的this
    function bind(fn, obj) {
        return function () {
            return fn.apply(obj, arguments);
        }
    }

    var NBA = {
        year: 2018,
    }
    var b = bind(toPlay, NBA);
    console.log(b('just toWin')); //

```
<br>

#### 箭头函数和匿名函数无this

```javascript
    var adder = {
        base: 1,
        //箭头函数无this，这里会默认向上找base:1
        add: function (a) {
            var f = v => v + this.base;
            //return f(a);
            //call方法传入一个对象时，依然没有this指针，f方法还是向上找到base=1
            return f.call(cc, a);   

            var cc = {
                base:33,
            }
        },

        addThruCall: function (a) {
            //对比箭头函数和非箭头函数this的区别
            //var f = v => v + this.base;
            var f = function (v) {
                return v + this.base;
            };
            var b = {
                base: 2
            };

            return f.call(b, a);
        }
    };
    console.log(adder.add(1));  // 2
    console.log(adder.addThruCall(1));  // 3
```

