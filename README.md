# zwj

## 负责内容：
	主要负责载入动画的二、三部分实现及载入动画的整合。

## 实现方法：
	结合CSS3和JS实现，各部分同时实现各自动画，使得总体动画更为流畅且易调试。

## 收获：
	1、项目实施前：
		a、一定要定好代码规范，比如各属性名的命名方式，规范越详细越好。
		b、一定要尽量研究好整体布局，每人各自负责的部分用定好的结构规范出来，js代码封装好并规定好相关调用接口。
		c、讨论出各功能实现顺序及重要性并定好实现时间、相关实现办法及未能实现时的处理方案。
	2、动画实现中：
		a、因为没有对动画实现过程进行深入的研究，导致重写一次。
			一开始看见动画即按照自己所见，将动画细分为几个步骤来实现。但是基本实现后发现动画生硬，且难以改动。
			然后细致观察原动画效果并与自己实现的动画相比较，发现原动画各组成部分均有各自动画且不同步，故不能简单地分为几个步骤来实现。所以更改实现方法，各部分同时实现各自动画，使得总体动画更为流畅且易调试。
		b、动画细节调试较为消耗时间，应提前做好准备。
			动画细节调试时应及时保存版本，容易查看总结调试历程，有助于调试出更好动画效果。
			动画细节调试比较枯燥耗时，要有心理准备。
		c、动画在手机端查看时有明显卡顿现象，具体优化方法正在学习。
			发现动画在手机端查看时有明显卡顿现象，但在PC端浏览器中模拟查看良好。所以开发移动端时一切要以移动端表现为准，每实现一个功能就应在移动端测试并作相关处理。
			发现自己不足，要多学习移动端优化等知识。
	3、动画整合中：
		a、因为项目实施前没有定好相关规范，导致整合时产生较大改动，也浪费了较多时间。磨刀不误砍柴功，提前做好准备会事半功倍。
