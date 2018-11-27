
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
>window 传入当作 global 参数的值。

* 封装在立即函数中的变量不会被外部函数访问到，从而避免与其它代码相冲突。 

***

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

