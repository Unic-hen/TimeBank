import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppOutline, UserOutline, AddCircleOutline } from "antd-mobile-icons";
import { TabBar, Image } from "antd-mobile";
import "./index.scss";
import { IsPC } from "../utils/equipment";
// PC
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  Input,
  Space,
  Avatar,
  Popconfirm,
  Layout,
  Menu,
  Select,
  message,
} from "antd";
import Logo from "@/components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout as logout_ } from "@/store/modules/user";
import { Link } from "react-router-dom";
import { getTrades } from "@/store/modules/trade";
const { Search } = Input;
const { Header, Footer } = Layout;

const layout = () => {
  const ref2 = useRef(null);

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [target, setTarget] = useState("/activities");
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    dispatch(getTrades());
    console.log("get trades");
  }, [dispatch]);
  // 获取当前页面网址
  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/new",
      title: "_",
      icon: <AddCircleOutline fontSize={36} />,
    },
    {
      key: "/userinfo",
      title: "我的",
      icon: <UserOutline />,
    },
  ];
  // pc
  const pctabs = [
    {
      key: "/",
      label: "首页",
    },
    {
      key: "/events",
      label: "发布活动",
    },
    {
      key: "/user",
      label: "个人中心",
    },
    {
      key: "/activities",
      label: "参与活动",
    },
    {
      key: "/train",
      label: "社区培训",
    },
    {
      key: "/feedback",
      label: "意见反馈",
    },
    {
      key: "/guide",
      label: "使用指南",
    },
  ];

  const navigate = useNavigate();
  const handleClick = (value) => {
    navigate(value);
  };
  // redux获取数据
  const servicesList = useSelector((state) => state.service.servicesList);
  // 搜索
  const onSearch = (value) => {
    let newState;
    if (target == "/user/voluntaryproject") {
      navigate(target, { state: [value] });
    } else if (target == "/activies") {
      navigate(target, { state: [value] });
    } else {
      newState = servicesList.filter((item) => {
        return item.serviceName.includes(value);
      });
      navigate(target, { state: newState });
    }

    console.log(value, target, newState);
  };

  const logout = () => {
    dispatch(logout_()).then((res) => {
      message.success("退出成功");
    });

    navigate("/");
  };

  const options = [
    { label: "报名活动", value: "/activities" },
    { label: "志愿项目", value: "/user/voluntaryproject" },
    { label: "当前活动", value: "/events/currentevents" },
  ];
  return (
    <>
      {IsPC() ? (
        <>
          <div
            className="pclayout"
            style={{
              backgroundColor: "#EBF3FB",
            }}
          >
            <header className="header">
              <section>
                <Logo />
              </section>
              <section>
                <div className="userinfo">
                  <p>你好！</p>
                  <span
                    href="/userinfo"
                    style={{ minWidth: "100px" }}
                    className="head"
                  >
                    {user.name ? (
                      <p className="username">{user.name}</p>
                    ) : (
                      <p className="username" ref={ref2}>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          点击登陆
                        </Link>
                      </p>
                    )}
                  </span>
                  <div className="timecoin">
                    <p>时间币：</p>
                    <span>{user.timeCoin} 个</span>
                  </div>
                  <Popconfirm
                    placement="bottom"
                    title={"您确认退出登陆吗？"}
                    description={""}
                    okText="Yes"
                    onConfirm={() => logout()}
                    cancelText="No"
                  >
                    <a style={{ color: "#900" }}>
                      <LogoutOutlined />
                      退出登陆
                    </a>
                  </Popconfirm>
                </div>
                <div className="search">
                  <Space.Compact size="large">
                    <Select
                      defaultValue={options[0].label}
                      options={options}
                      onChange={(e) => setTarget(e)}
                    />
                    <Search
                      placeholder="在这里活动名称关键词"
                      allowClear
                      onSearch={onSearch}
                      style={{
                        width: 480,
                      }}
                    />
                  </Space.Compact>
                </div>
              </section>
            </header>
            <div className="layout">
              <Layout style={{ height: "100%" }}>
                <Header
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#003366",
                  }}
                >
                  <div className="demo-logo" />
                  <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[
                      pctabs
                        .filter((item) => {
                          if (pathname.indexOf(item.key) !== -1)
                            return item.key;
                        })
                        .pop().key,
                    ]}
                    items={pctabs}
                    onClick={(e) => navigate(e.key)}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      fontSize: "30px",
                      backgroundColor: "#003366",
                    }}
                    theme="dark"
                  />
                </Header>
                <Outlet />
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  FanFei Time Bank ©{new Date().getFullYear()} Created by FanFei
                  Company
                </Footer>
              </Layout>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            {/* NavBar */}

            <Outlet />
            {/* TabBar */}
            <TabBar
              activeKey={pathname}
              onChange={(value) => handleClick(value)}
            >
              {tabs.map((item) => (
                <TabBar.Item
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                />
              ))}
            </TabBar>
            <div className="navBar"></div>
          </div>
        </>
      )}
    </>
  );
};

export default layout;
