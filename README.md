


## 北京科技大学机电楼教室预约系统v1.0 

-----

##### 阶段一

- 完成用户登录

- 完成通过日期教室，获取可借时间段

- 完成提交新借阅

- 完成获取借阅列表并显示预约的不同状态

- 添加预约成功状态查看二维码功能

##### 阶段二

- 完成管理员登录

- 完成通过sessionStorage自动判断用户类型并跳转

- 完成管理借阅和查看已处理功能

- 增加管理员反馈

- 添加用户信息显示

- 添加登出页面

##### 阶段三

- 完成编辑教室页面，显示，增加，编辑，删除教室安排

- 添加选择日期后星期提醒

- 添加关于系统操作说明页面

- 添加管理员页面排序选择，可基于日期，时间段，教室号，操作状态进行排序

- 添加用户排序，可基于时间和预约状态

##### 阶段四

- 修复用户信息显示bug

- 添加用户和管理员查看操作反馈功能

- 页面添加顶部固定和回到顶部

- 添加系统使用反馈和底部信息栏

- 修改部分布局，改为响应式支持手机浏览

##### 待完成

- 基于需求添加特殊预约方案（一次预约多个教室，教室预约时间扩展）

- 完善注释和文档

- 添加测试和自动化部署

---------

#### 备注：

- 全站为单页应用，首屏加载资源后只通过ajax交互，无需刷新

- 前端使用：

	- React.js
	
	- flux

- 自动化工具使用 ：

	- gulp

	- browserify 

- UI布局使用：

	- React-Bootstrap

	- AmazeUI

- 工具库：
	
	- Jquery (Ajax)

	- React-router (路由)

	- object-assign

-----

## License

##### The MIT License (MIT)

Copyright (c) 2015 kevinwang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


