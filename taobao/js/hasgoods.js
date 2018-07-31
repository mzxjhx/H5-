var result=[
    {
        "content":"精致大方的一款半身裙，采用性感魅惑的蕾丝材质，展现十足魅力。",
        "title":"DAZZLE 复古蕾丝半裙",
        "pic":"//img.alicdn.com/imgextra/i1/2972417175/TB2_dnJXshmZKJjSZFPXXc5_XXa_!!2972417175-0-daren.jpg",
        "zanTotal":"108",
        "itemId":"559307926505",
        "url":"//www.taobao.com/markets/tbhome/yhh-detail?contentId=2200000200387990166&scm=1007.12846.65991.0&pvid=c5041a47-8b30-4413-9ec4-b9a8fc4d04f8",
        "contentId":"2200000200387990166",
        "_sys_point_local":false
    },
    {
        "content":"日本原装进口！iPhone 7/7P真皮保护套，纯手工制作",
        "title":"日本匠人手工制作！iP7真皮保护套",
        "pic":"//img.alicdn.com/imgextra/i2/2772518106/TB2C_rej3oQMeJjy1XaXXcSsFXa_!!2772518106-2-beehive-scenes.png",
        "zanTotal":"0",
        "itemId":"542680611486",
        "url":"//www.taobao.com/markets/tbhome/yhh-detail?contentId=2500000200389682321&scm=1007.12846.65991.0&pvid=c5041a47-8b30-4413-9ec4-b9a8fc4d04f8",
        "contentId":"2500000200389682321",
        "_sys_point_local":false
    },
    {
        "content":"圆头鞋型，给脚趾提供足够的活动空间。",
        "title":"朱塞佩·萨诺第 铆钉系带鞋",
        "pic":"//img.alicdn.com/imgextra/i3/150975181/TB2s24HlDXYBeNkHFrdXXciuVXa_!!150975181-0-daren.jpg",
        "zanTotal":"3",
        "itemId":"570327309832",
        "url":"//www.taobao.com/markets/tbhome/yhh-detail?contentId=2500000200687308137&scm=1007.12846.65991.0&pvid=c5041a47-8b30-4413-9ec4-b9a8fc4d04f8",
        "contentId":"2500000200687308137",
        "_sys_point_local":false
    },
    {
        "content":"字母点缀，增加了亮眼度。",
        "title":"rouge lounge字母单肩包",
        "pic":"//img.alicdn.com/imgextra/i4/2336690561/TB2E5MVz3mTBuNjy1XbXXaMrVXa_!!2336690561-0-beehive-scenes.jpg",
        "zanTotal":"0",
        "itemId":"567006872980",
        "url":"//www.taobao.com/markets/tbhome/yhh-detail?contentId=2500000200748521739&scm=1007.12846.65991.0&pvid=c5041a47-8b30-4413-9ec4-b9a8fc4d04f8",
        "contentId":"2500000200748521739",
        "_sys_point_local":false
    },
    {
        "content":"纯色设计，展现优雅气质。",
        "title":"Dr. Martens纯色双肩包",
        "pic":"//img.alicdn.com/imgextra/i4/2336690561/TB2slQOwyOYBuNjSsD4XXbSkFXa_!!2336690561-0-beehive-scenes.jpg",
        "zanTotal":"0",
        "itemId":"564427125129",
        "url":"//www.taobao.com/markets/tbhome/yhh-detail?contentId=2500000201509830864&scm=1007.12846.65991.0&pvid=c5041a47-8b30-4413-9ec4-b9a8fc4d04f8",
        "contentId":"2500000201509830864",
        "_sys_point_local":false
    },
    {
        "content":"撞色元素，充满文艺气息。",
        "title":" GUCCI拼接手提包",
        "pic":"//img.alicdn.com/imgextra/i3/2336690561/TB2Nr0aEFmWBuNjSspdXXbugXXa_!!2336690561-0-beehive-scenes.jpg",
        "zanTotal":"0",
        "itemId":"563655402204",
        "url":"//www.taobao.com/markets/tbhome/yhh-detail?contentId=2500000201447925602&scm=1007.12846.65991.0&pvid=c5041a47-8b30-4413-9ec4-b9a8fc4d04f8",
        "contentId":"2500000201447925602",
        "_sys_point_local":false
    }
]

function hasgoods(){
	var ul = document.getElementsByClassName('goods-list')[0];

	for(var i=0;i<result.length;i++){
		(function(x){

			var li = document.createElement('li');
			li.classList.add('clearfix');

			ul.appendChild(li);
/*			var a=document.createElement('a');
			a.setAttribute('href',result[x].url);
			a.setAttribute('target','_blank');
			li.appendChild(a);
						
			a.appendChild(createElementByHtml('div','img-wrapper','<img src="http:'+result[x].pic+'_180x180xzq90.jpg_.webp" />'));
			
			div = createElement('div','info','');
			div.appendChild(createElementByHtml('h4','',result[x].title));
			div.appendChild(createElementByHtml('p','',result[x].content));
			div.appendChild(createElementByHtml('p','info-blue',result[x].zanTotal + '  人说好'));
			a.appendChild(div);
			*/

            var content='<a href="'+result[x].url+'" target="_blank">'+
                '<div class="img-wrapper">'+
                '<img src="http:'+result[x].pic+'_180x180xzq90.jpg_.webp" />'+
                '</div>'+
                '<div class="info">'+
                '<h4>'+result[x].title+'</h4>'+
                '<p>'+result[x].content+'</p>'+
                '<p class="info-blue"><i class="tb-ifont">&#58998;</i><span>'+result[x].zanTotal+' 人说好</span></p></div></a>';
            li.innerHTML=content;

		})(i)
		
	}
	
}

function createElement(ele,clas,content){
	var div = document.createElement(ele);
	if(clas != '' && clas != undefined)
		div.className=clas;
	if(content != '' && content != undefined)
	div.innerText=content;
	return div;
}

function createElementByHtml(ele,clas,content){
	var div = document.createElement(ele);
	if(clas != '' && clas != undefined)
		div.className=clas;
	if(content != '' && content != undefined)
	div.innerHTML=content;
	return div;
}




