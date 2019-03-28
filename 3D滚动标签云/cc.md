在球体坐标系中， x y z是通过以下三个公式来确定，其中r是半径
$$ x=rsin \theta cos \phi $$
$$ y=rsin \theta sin \phi $$
$$ z=rcos \theta $$



要实标签的均匀分布就要对θ φ取随机值，网上找的两个公式，原理未搞懂：
$$ \theta=arccos(\frac{2*i}{length} -1) $$
$$ \phi=\theta \sqrt{length*\pi}$$

坐标旋转：

$$ l = \frac{\pi}{180} $$

$$
\left[
 \begin{matrix}
    x1\\
    y1\\
    z1
 \end{matrix}
\right]=
\left[
 \begin{matrix}
   cox(bl) & 0 & sin(bl)\\
   0 & 1 & 0\\
   -sin(bl) & 0 & cos(bl)
  \end{matrix} 
\right]
\left[
 \begin{matrix}
   1 & 0 & 0\\
   0 & cos(al) & -sin(al)\\
   0 & sin(al) & cos(al)
  \end{matrix} 
\right]
\left[
 \begin{matrix}
    x\\
    y\\
    z
 \end{matrix}
\right]
$$

$$  $$
