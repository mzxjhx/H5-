function drag(element) {

    var startX = 0,
        startY = 0,
        ticking = false,
        raf,
        doc = document;

    element.addEventListener("touchstart", function (e) {


        var e = e || window.event,
            touchs = e.touches[0];
        e.preventDefault();       //低端安卓 touch事件 有的导致touchend事件时效  必须开始 就加   e.preventDefault();
        // text a ipnut textarea 几个 等标签除外   
        // ，另外自定义移动端touchstart touchend组合的 hover事件，建议不加这个，不然页面无法滚动
        //touchmove 开始 就加  不然抖动一下，才能touchmove， 然后才正常 尤其早些的 三星   系列自带浏览器


        startX = parseInt(touchs.pageX - (element.lefts || 0));
        startY = parseInt(touchs.pageY - (element.tops || 0));

        doc.addEventListener("touchmove", update, false);
        doc.addEventListener("touchend", end, false);

    }, false);





    var update = function (e) {

        var e = e || window.event;
        if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
        e.preventDefault();

        //cancelAnimationFrame(raf);
        if (!ticking) {

            var touchs = e.changedTouches[0];

            //1先触摸移动  
            element.lefts = touchs.pageX - startX;
            element.tops = touchs.pageY - startY;

            //2交给requestAnimationFrame 更新位置
            //raf=requestAnimationFrame(function(){draw();});
            raf = requestAnimationFrame(draw);

        }

        ticking = true;
    };




    var draw = function () {
        ticking = false;
        var nowLeft = parseInt(element.lefts);    //滑动的距离             touchmove时候，如果加阻力，可能有细小的抖动；我想应该是移动端 部分支持0.5px的缘故； parseInt的转化有点牵强；
        var nowTop = parseInt(element.tops);    //滑动的距离    

        element.style.webkitTransform = element.style.transform = "translate3D(" + nowLeft + "px," + nowTop + "px,0px)";

    };

    var end = function () {
        var endLeft = parseInt(element.lefts);    //滑动的距离    
        var endTop = parseInt(element.tops);    //滑动的距离

        //element.style.webkitTransform=element.style.transform = "translate(" + endLeft+ "px," + endTop + "px)"; 

        doc.removeEventListener("touchmove", update, false);
        doc.removeEventListener("touchend", end, false);
        // cancelAnimationFrame(raf);

    }

};

function raf_debounce(fn){ //touchmove  scroll节流
    var ticking=false;
    var update=function (that) {
        ticking = false;
        fn&&fn.apply(that,arguments);
    }
    
   return function() {
    var that=this;
      if(!ticking) {
           ticking = true;
        requestAnimationFrame(function(){
            update(that);
        });
      }  
    } 
};

;(function() {
    var lastTime = 0;
    var vendors = ["ms", "moz", "webkit", "o"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall)
            },
            timeToCall);
            lastTime = currTime + timeToCall;
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id)
        }
    }
} ());