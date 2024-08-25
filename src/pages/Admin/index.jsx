import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Avatar,
  Popover,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ScheduleOutlined,
  AuditOutlined,
  ClearOutlined,
  UserOutlined,
  BookOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  LoginOutlined,
  FileDoneOutlined,
  DownOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout as logout_ } from "@/store/modules/user";
import { fetchAuditEventList } from "@/store/modules/audit";
import logo from "@/assets/images/user/logo.png";

const { Header, Sider, Content } = Layout;

// 侧边栏配置
const items = [
  { key: "/panel", icon: <HomeOutlined />, label: "首页" },
  { key: "/blockpanel", icon: <BoxPlotOutlined />, label: "区块面板" },
  {
    key: "eventmanage",
    icon: <ScheduleOutlined />,
    label: "活动管理",
    children: [
      {
        key: "/eventaudit",
        icon: <AuditOutlined />,
        label: "活动审核",
      },
      {
        key: "/tracking",
        icon: <CalendarOutlined />,
        label: "活动跟踪",
      },
      // {key:"/",icon:ClearOutlined,label:"活动维护"},
    ],
  },
  {
    key: "/usermanage",
    icon: <UserOutlined />,
    label: "用户管理",
  },
  {
    key: "useraudit",
    icon: <UserOutlined />,
    label: "用户审核",
    children: [
      { key: "/forlogin", icon: <LoginOutlined />, label: "信息审核" },
      {
        key: "/signservice",
        icon: <CalendarOutlined />,
        label: "报名审核",
      },
      {
        key: "/releaseevent",
        icon: <FileDoneOutlined />,
        label: "发布审核",
      },
    ],
  },
  { key: "/train", icon: <BookOutlined />, label: "社区培训" },
  { key: "/comment", icon: <EditOutlined />, label: "意见处理" },
  { key: "/guide", icon: <QuestionCircleOutlined />, label: "操作指南" },
];

const Admin = () => {
  // 面包屑
  const [crumb, setCrumb] = useState([]);
  // 侧边栏展开收起
  const [collapsed, setCollapsed] = useState(true);
  // 获取用户数据
  const userinfo = {
    id: 10085,
    name: "张三",
    mobile: "13800138000",
    password: "$2a$10$RZrshYq04A/rh6J6hMqcB.vIlV/IGoWWtd048jeuEGiSd0crQa47S",
    idCard: "123456789012345678",
    age: 30,
    sex: 0,
    code: 0,
    area: "南充",
    creatTime: "2024-01-24 11:05:43",
    updateTime: "2024-01-24 15:03:07",
    isDeleted: 0,
  };
  const navigate = useNavigate();
  // 点击侧边栏
  const handleClick = ({ key }) => {
    navigate("/admin" + key);

    const index = items.map((item) => {
      if (item.children) {
        const point = item.children.filter((itm) => itm.key === key);
        console.log(point);
        if (point.length) {
          return point[0];
        }
      }
      if (item.key === key) {
        return item;
      }
    });
    const current = index.filter((item) => item != undefined)[0];

    setCrumb([{ ...current, title: current.label }]);
  };
  // hooks
  const dispatch = useDispatch();
  const location = useLocation();

  // 处理查看详细
  const { pathname } = location;
  useEffect(() => {
    if (pathname === "/admin/info") {
      console.log(1);
      // if (!crumb.find((item) => item.key === "/info")) {
      setCrumb([...crumb, { title: "查看", key: "/info" }]);
      return;
      // }
    }
    setCrumb(crumb.splice({ title: "查看", key: "/info" }, 1));
    if (pathname === "/admin") {
      navigate("/admin/panel");
    }
    // dispatch(fetchAuditEventList({ page: 1, pageSize: 10 }));
  }, [pathname, dispatch]);
  // 登出
  const logout = async () => {
    await dispatch(logout_()).then(() => {
      message.success("退出成功");
      setTimeout(() => {
        navigate("/login");
      }, 100);
    });
  };
  return (
    <div>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "97%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          justifyContent: "space-between",
          color: "#124F7B",
          borderBottom: "1px solid #2E54A1",
          padding: "0 20px",
        }}
      >
        <div className="admin-logo">
          <div className="logo-icon">
            <img src={logo} alt="帆长时间银行" />
          </div>
          <h1
            style={{
              // color: "#99BCDB",
              color: "#124F7B",
            }}
          >
            帆长时间银行
          </h1>
        </div>
        <div className="admin-head">
          <Avatar
            size="large"
            style={{
              backgroundColor: "",
            }}
          >
            {userinfo.name}
          </Avatar>
          <Popover
            placement="bottom"
            content={
              <div
                style={{
                  width: 100,
                  textAlign: "center",
                  lineHeight: 2,
                  color: "#999",
                }}
              >
                <p>消息通知</p>
                <p>个人中心</p>
                <hr color="#eee" />
                <a onClick={logout}>退出登录</a>
              </div>
            }
          >
            <div className="admin-name">
              {/* <span style={{ marginRight: 10 }}>{userinfo.name}</span> */}
              <DownOutlined />
            </div>
          </Popover>
        </div>
      </Header>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "#fff",
            minHeight: 940,
          }}
          collapsed={collapsed}
        >
          <Menu
            style={{ backgroundColor: "#fff" }}
            mode="inline"
            theme="light"
            defaultSelectedKeys={[pathname.substring(6)]}
            items={items}
            onClick={handleClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Breadcrumb items={crumb} />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
