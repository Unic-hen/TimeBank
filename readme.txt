使用时请注意安装node：https://nodejs.org/en，无脑下最新稳定版本即可。

初始化：
init.bat
运行：
run.bat
打包和运行：
build.bat

文件夹源码描述:
├─public //网页的公共文件
├─src //源码文件夹
│  ├─api //网页的接口管理
│  │  └─apis
│  ├─assets //网页静态资源文件夹
│  │  └─images //图片文件夹
│  │      ├─panel //用于构建面板的图片文件
│  │      └─user //用于构建的图片文件
│  ├─components //自定义组件
│  │  ├─DescLine
│  │  ├─InfoBox
│  │  ├─LineChart
│  │  ├─Logo
│  │  ├─PieChart
│  │  └─ReviewBox
│  ├─layout //网页全局的模版代码
│  ├─pages //网页的各个页面
│  │  ├─AccountInfo //用户页面
│  │  ├─Activities  //参加活动页面文件
│  │  │  └─components //组件，这个页面用到的私有组件，以下同理
│  │  │      ├─ServiceBox
│  │  │      └─ServiceTag
│  │  ├─Admin //管理员的页面文件夹
│  │  │  ├─Comment 
│  │  │  ├─EventAudit //活动管理相关页面
│  │  │  │  ├─components
│  │  │  │  │  └─ServiceTable
│  │  │  │  └─Info //活动详情页面
│  │  │  │      └─components
│  │  │  │          └─DescBox
│  │  │  ├─ForLogin //用户登陆信息审核页面
│  │  │  │  └─LookUser //查看用户信息页面
│  │  │  │      └─components
│  │  │  │          └─InfoBox
│  │  │  ├─Guide //管理员指南
│  │  │  ├─Panel //管理员首页面板页面文件
│  │  │  │  └─components
│  │  │  │      └─PanelBox
│  │  │  ├─ReleaseEvent //发布活动审核页面文件
│  │  │  │  └─LookRelease
│  │  │  ├─SignService //参与活动资格审核页面文件
│  │  │  │  └─LookSign
│  │  │  ├─Tracking //活动追踪页面文件
│  │  │  │  └─components
│  │  │  │      └─ServiceTable
│  │  │  ├─Train //管理员对培训的管理页面文件
│  │  │  ├─UserAudit //用户审核页面
│  │  │  │  └─components
│  │  │  │      └─UserTable
│  │  │  └─UserManage //用户管理页面文件
│  │  │      └─ViewUser
│  │  ├─ErrorPage //404错误页
│  │  ├─Events //与活动事物相关的网页文件
│  │  │  ├─CurrentEvents
│  │  │  │  └─components
│  │  │  │      ├─InfoCard
│  │  │  │      ├─ServiceBox
│  │  │  │      └─ServiceTag
│  │  │  ├─Demand 
│  │  │  ├─Detial 
│  │  │  ├─History 
│  │  │  └─New 
│  │  ├─ForgetPwd //用户忘记密码修改密码页面文件
│  │  ├─Home //用户首页文件
│  │  │  └─components
│  │  │      ├─Databox
│  │  │      ├─Exhibition
│  │  │      └─PanelBox
│  │  ├─Login //登陆页面
│  │  │  └─components
│  │  ├─Register //注册页面
│  │  ├─Training //培训相关的页面文件
│  │  │  ├─Certificat
│  │  │  ├─components
│  │  │  ├─Exams
│  │  │  ├─Participate
│  │  │  │  └─components
│  │  │  │      └─TrainBox
│  │  │  └─TrainInfo
│  │  └─User //网页与用户有关的页面文件
│  │      ├─MyTrade
│  │      │  └─components
│  │      ├─Settings
│  │      ├─Tissue
│  │      ├─UserInfo
│  │      │  └─components
│  │      │      └─InfoBox
│  │      ├─VoluntaryProject
│  │      │  └─components
│  │      │      └─InfoCard
│  │      └─Wish
│  ├─router //路由管理相关文件
│  ├─store //状态管理相关文件
│  │  └─modules
│  └─utils //工具库
└─接口文档 
