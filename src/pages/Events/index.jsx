// PC
import { Layout, Breadcrumb, theme, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const { Content, Sider } = Layout;
const Events = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  useEffect(() => {
    if (pathname === "/events") {
      navigate("/events/new");
    }
  }, []);

  const [items, setItems] = useState([
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "",
      title: "发布活动",
    },
    {
      href: "/events/new",
      title: "创建活动",
    },
  ]);
  const pcsidebar = [
    {
      key: "/events/new",
      label: "创建活动",
    },
    {
      key: "/events/currentevents",
      label: "当前活动",
    },
    {
      key: "/events/history",
      label: "历史活动",
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 切换子目录
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
export default Events;
