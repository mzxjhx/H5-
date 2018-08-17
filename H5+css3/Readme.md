
### * 用纯CSS制作一个向上的三角形的原理：
   宽和高为0，把上、左、右三条边隐藏掉（颜色设为 transparent）
``` css
{
	width: 0;
	height: 0;
	border-width: 20px;
	border-style: solid;
	border-color: transparent transparent blue transparent;
}
```
