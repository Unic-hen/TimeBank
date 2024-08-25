import { Breadcrumb, Layout, Menu, theme } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const { Content, Sider } = Layout;
const Training = () => {
  // 面包屑
  const [items, setItems] = useState([
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "",
      title: "社区培训",
    },
    {
      href: "train/participate",
      title: "参加培训",
    },
  ]);
  // 侧边栏
  const sidebar = [
    {
      key: "/train/participate",
      label: "参加培训",
    },
    {
      key: "/train/exams",
      label: "我的考试",
    },
    {
      key: "/train/certificat",
      label: "结业证书",
    },
  ];
  // 切换目录
  const handleClick = (e) => {
    navigate(e.key);
    const index = sidebar.filter((item) => item.key === e.key);
    items[2] = {
      href: e.key,
      title: index[0].label,
    };
    setItems(items);
  };
  // 导航
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/train") {
      navigate("/train/participate");
    }
  }, []);
  // 样式
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        padding: "0 48px",
      }}
    >
      <Breadcrumb style={{ margin: "16px 0" }} items={items} />
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
            items={sidebar}
            onClick={(e) => handleClick(e)}
          />
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Content>
  );
};
export default Training;
