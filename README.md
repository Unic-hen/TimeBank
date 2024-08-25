# Fanzhang Time Bank (帆长时间银行)

## 启动方式

- npm

```shell
npm install
npm run dev
```

- yarn

```shell
yarn
yarn run dev
```
## 项目介绍

针对国家老龄化问题设计并开发的全栈项目，前期使用node作为后端，antd搭建前端对项目原型快速开发，后期与后端完善和优化完善各个模块。

角色：老人（需求者），志愿者，管理员

六个模块：

(1) 注册登录模块。实现老人需求者、志愿者、管理员的注册和登录，老人需求者和志愿者注册登录进行常规功能操作，管理员登录可进行高权限操作，如服务内容与资格审核等高权限功能。

(2) 操作管理模块。为用户提供事务管理模块，在此模块中用户可进行志愿服务的编辑、发布、删除、响应等功能。用户可查看自己发布的服务信息、历史需求与历史服务。

(3) 审核管理模块。提供管理员审核管理模块，对提交发布的志愿服务进行内容审核与用户资格审核，其中包含待审核服务/资格和已审核服务/资格。

(4) 搜索查询模块。提供搜索查询模块，用户可查看当前发布的志愿服务与可提供服务信息。

(5) 信息管理模块。用户对个人信息进行核实校对、管理员进行修改、管理、维护等操作。

(6) 时间币管理模块。为用户提供时间币管理功能，系统对时间币进行背书发行，当完成志愿服务双方确认无误后，进行服务时间与时间币的等价转换，实现时间币交易功能，提供用户查看个人服务资产与溯源查看交易信息等功能。

技术栈

* 使用react全家桶作为前端框架，antd作为ui框架，sass处理样式 
* 封装常用信息描述组件、echarts图表组件
* 使用pm2使node后端上云服务器，实现便捷接口调用，利用express操作数据并暴露接口
* 使用图片懒加载，优化页面渲染 

## 文件夹

```
- public 静态文件
- src/ 源码
  |-- assets/ 静态资源
  |-- api/ 接口控制和逻辑含 axios
  |-- store/ 状态管理
  |-- pages/ 页面 根据路由放置页面
      |-- Home/ 主页
      |-- UserInfo/ 用户
      |-- Login/ 登录
      |-- ErrorPage/ 404
      |-- Register/ 注册
      |-- History/ 历史
      |-- Logout/ 登出
      |-- New/ 新建服务
      |-- MoreInfo/ 更多信息
      |-- Settings/ 设置
  |-- router/ 路由
  |-- main.jsx 入口
  |-- layout/ 布局
  |-- User/ 用户
  |-- utils/ 工具
- server/ 服务端
  |-- controller/ 控制器
  |-- router/ 路由接口服务
  |-- app.js 入口
  |-- utils/ 工具
  |-- data.json 数据
  |-- package.json 项目配置文件
  |-- yarn.lock 依赖包版本锁定
- package.json 项目配置文件
- yarn.lock 依赖包版本锁定
- index.html 入口文件
```

## 接口文档

见当前目录下“接口文档”

# React + Vite

# develop info

**一定要先拉取再开发**

```shell
git pull
```

没拉取开发了，不想本地被覆盖：
先本地暂存，然后再拉取，上传

```shell
git stash
git pull
git add .
git commit -m "message"
git push origin tree
```

- nodejs在线服务(暂时停止维护)

```shell
cd server
yarn
node app.js
```
