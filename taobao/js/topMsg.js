//首页-地区选择
function selectRegion() {
    var name = document.getElementById('region-name');
    var lis =document.getElementsByClassName('menu-items');

    for(var i=0,len=lis.length;i<len;i++){
        lis[i].onclick=function () {
            name.innerText = this.innerText;
			console.log(this.parentNode);
			//this.parentNode.style.display='none';
        }
    }
}

