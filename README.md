
# 启动方式

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

针对国家老龄化问题设计并开发的全栈项目，前期使用node作为后端，antd搭建前端对项目原型快速开发，后期与后端完善和优化完善各个模块。

使用react全家桶作为前端框架，antd作为ui框架，sass处理样式 
封装常用信息描述组件、echarts图表组件
使用pm2使node后端上云服务器，实现便捷接口调用，利用express操作数据并暴露接口
使用图片懒加载，优化页面渲染 

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

## 权限

用户权限：
访客权限？看到一部分内容，需要操作时跳转到登陆
管理员--0
老人--1
志愿者--2

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
