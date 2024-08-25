// PC
import { Layout, Breadcrumb, theme, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const { Content, Sider } = Layout;
const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    if (pathname === "/user") {
      navigate("/user/info");
    }
  }, []);

  const [items, setItems] = useState([
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "",
      title: "个人中心",
    },
    {
      href: "/user/info",
      title: "我的信息",
    },
  ]);

  // 侧边栏列表
  const pcsidebar = [
    {
      key: "/user/info",
      label: "我的信息",
    },
    {
      key: "/user/voluntaryproject",
      label: "我的志愿",
    },
    {
      key: "/user/tissue",
      label: "我的组织",
    },
    {
      key: "/user/mytrade",
      label: "我的交易",
    },
  ];

  // {
  //   key: "/user/myservice",
  //   label: "我的服务",
  // },
  // {
  //   key: "/user/history",
  //   label: "历史服务",
  // },
  // {
  //   key: "/user/settings",
  //   label: "设置",
  //   icon: <SettingOutlined />,
  // },

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleClick = (e) => {
    // console.log(e);
    navigate(e.key);
    const index = pcsidebar.filter((item) => {
      return item.key === e.key;
    });
    items[2] = { href: e.key, title: index[0].label };
    setItems(items);
  };

  return (
    <Content
      style={{
        padding: "0 48px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={items}
      />
      <Layout
        style={{
          padding: "24px 0",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: "680px",
        }}
      >
        <Sider
          style={{
            background: colorBgContainer,
          }}
          width={200}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            style={{
              height: "100%",
              fontSize: "24px",
            }}
            items={pcsidebar}
            onClick={(e) => handleClick(e)}
          />
        </Sider>
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Content>
  );
};
export default User;
