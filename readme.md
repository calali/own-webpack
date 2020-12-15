Bundlers let us write modules that works in a browser.

### 实现步骤：
1.解析单个文件并提取他的依赖
    通过ast工具把代码转换为commonjs的代码，并提取依赖文件
2.递归构建依赖关系图
    从入口文件开始，把所有文件的依赖关系创建出来
3，把所有文件打包成一个文件
    把所有代码打包在一个自执行函数里。从入口文件开始执行，把依赖浏览器可以支持的“代码块”执行下去。
    这里不得不夸一句babel-core的transformFromAst方法NB，直接把es6+的代码转换为浏览器可以直接执行的代码。

参考资料：
https://www.youtube.com/watch?v=Gc9-7PBqOC8&list=LLHK1mTHpwrUeYgF5gu-Kd4g