# 分布式标记系统
## 使用方法
### 创建工程
执行

    python create.py projectName practiceFile rowsPerGroup
如

    python create.py alias part-r-00000 50
程序会自动将part-r-00000文件分成每50行一组的文件群，存在pending/alias文件夹中
运行

    node server
开启网页服务器即可使用。默认端口为405。
### 监控工程
在标注过程中，使用

    python monitor.py projectName
来监控某一个工程
### 结束工程
标注结束后，使用

    python close.py projectName
来合并标注结果。
## 特色介绍
支持多人同时标注，在选择界面每个文件有三种状态

* 该文件待标注  
* 有人正在标注这个文件  
* 该文件标注结束

可以保证每个文件只会有一个人在标注，且只被标注一次。

## 已知问题
标注界面会提供提交和取消两种出口，用于提交文件或释放文件。若用户强行退出标注页面，则会弹出提示说明这样会导致文件始终处于标注状态。若用户依然选择退出，则该文件将保持“标注中”状态。
该状态的接触需要管理员访问

    http://domain/practice?project=***&group=***&cancel=1
来取消该project中这个group的占用状态

