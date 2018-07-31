



var ads = [
    {"imgUrl":"./images/eae6f8c89166989d0318e1e2ab5a9887.jpeg","linkUrl":"","title":"世界杯决赛"},
    {"imgUrl":"./images/291b5ba87c3d826c7fa14c8a985e2af7.jpg","linkUrl":"","title":"疫苗又出事了……"},
    {"imgUrl":"./images/c9b0190a91a87cdbe787a63b97aafda4.jpg","linkUrl":"","title":"这个循环轮播给力"},
    {"imgUrl":"./images/e5086e8daf2df611bebe83de6a674f24.jpg","linkUrl":"","title":"taobao布局好累"}
    ]
	

var wid;    //每次移动量
var size = 0;	//div下图片的总数量
var index = 1;
var timer;

var startX;
var startY;
var moveSwitch = false;
var currentLeft;
var currentTop;

//广告轮播图js，图片向左移动
function funAds() {
    var div = document.getElementById('region-adimgs');
    var ull = document.getElementById('region-adpoints').getElementsByTagName('ul')[0];
    size = ads.length + 2;
    wid = 0 - div.offsetWidth;  //向左移动，为负值
    div.style.transform='translate(' + wid + 'px,0px)';
    div.style.webkitTransform='translate(' + wid + 'px,0px)';	//safari 浏览器
    div.style.width = 500 * size + 'px';
    console.log(wid);
    //clone最后一张图，各右移动时使用
    var img = document.createElement('img');
    img.className='aditem';
    img.setAttribute('id','adimg_1');
    img.setAttribute('src',ads[ads.length - 1].imgUrl);
    div.appendChild(img);
    for(var i=0;i<ads.length;i++){
        (function (x) {
            var img = document.createElement('img');
            img.className='aditem';
            img.setAttribute('id','adimg_' + (x + 2));
            img.setAttribute('src',ads[x].imgUrl);
            div.appendChild(img);

        })(i)
    }
    //clone第一张图，向左移动时使用
    var img = document.createElement('img');
    img.className='aditem';
    img.setAttribute('id','adimg_' + size);
    img.setAttribute('src',ads[0].imgUrl);
    div.appendChild(img);

    //生成小圆点
    for(var i=0;i<ads.length ;i++) {
        (function (x) {
            var li = document.createElement('li');
            li.setAttribute('id', 'point_' + (x + 1));
            li.className = 'adpointoff';
            ull.appendChild(li);
        })(i)
    }
	div.addEventListener('touchstart',touchstart, false);
	div.addEventListener('touchmove',touchmove,false);
	div.addEventListener('touchend',ontouchend,false);

    timer = setInterval(move,2000);
}
	//移动端触屏事件
    function touchstart(event){
		var event = event || window.event;
		moveSwitch = true;
		startX = event.touches[0].clientX;
    }
    //
    function touchmove(event) {
		var event = e||window;
		if(!moveSwitch) return;
		window.clearInterval(timer);
		currentLeft = event.touches[0].clientX;
		var curdis = currentLeft - startX;
		console.log('touchmove=' + (wid * index + curdis));
		div.style.transform="translate(" + (wid * index + curdis) +"px,0px)";
    }
	//
	function ontouchend(event){
		e=e||window.event;
		moveSwitch =false;

		if(Math.abs(startX - currentLeft)> 150){

			index++;
			div.style.transform="translate(" + (wid * index) +"px,0px)";

			if(index == size - 1){
				console.log('index=' + index);
				setTimeout(function () {
					div.style.transitionDuration='0ms';
					div.style.webkitTransitionDuration='0ms';
					index = 1;
					div.style.transform="translate(" + wid * index +"px,0px)";
				},500);

			}
			
		} 
		else{
			div.style.transform="translate(" + wid * index +"px,0px)";
		}
		timerstart();
	}
function move(){
	index++;
	var div = document.getElementById('region-adimgs');
	div.style.transitionDuration='500ms';
	div.style.webkitTransitionDuration='500ms';
	div.style.transform="translate(" + wid * index +"px,0px)";
	setPoints(index <= ads.length? index:ads.length);
	if(index == size - 1){

		//css3的动画有一个500毫秒的执行时间,所以我们这里也需要等待500毫秒后再进行重置操作，这样可以无缝循环
		setTimeout(function () {
			//时间设置为0，无动画效果
			div.style.transitionDuration='0ms';
			div.style.webkitTransitionDuration='0ms';
			index = 1;
			div.style.transform="translate(" + wid * index +"px,0px)";
			setPoints(index);
		},500);

	}
}
//设置轮播图小圆点css
function setPoints(x) {

    var item = document.getElementById('point_' + (x ));
    item.className='adpointon';
    siblings(item).forEach(function(value,index,array){
        value.className='adpointoff';
    });

}