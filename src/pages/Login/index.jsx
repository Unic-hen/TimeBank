import Logo from "@/components/Logo";
import timemanager from "@/assets/images/timemanager.svg";
import { Form, Input, Checkbox, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
const options = [
  {
    label: "老人",
    key: 1,
  },
  {
    label: "志愿者",
    key: 2,
  },
  {
    label: "管理员",
    key: 0,
  },
];
const RoleOption = ({ option, onClick, index }) => {
  return (
    <a
      style={{
        width: 100,
        textAlign: "center",
        borderBottom: index == option.key ? "2px solid #22f" : "",
        fontWeight: 400,
        color: "#000",
      }}
      onClick={onClick}
    >
      {option.label}
    </a>
  );
};
const Login = () => {
  // state
  const [select, setSelect] = useState(1);
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // funcs
  let mobile, idCard;
  const finish = async (e) => {
    const { info, password } = e;
    if (info.length && info.length === 11) {
      mobile = info;
    } else if (info.length && info.length === 18) {
      idCard = info;
    } else {
      message.error("请输入正确的手机号或身份证号");
    }
    const data = {
      code: select,
      idCard,
      mobile,
      password,
    };
    await dispatch(fetchLogin(data))
      .then((res) => {
        select == 0 && res == 0 ? navigate("/admin") : navigate("/");
        message.success("登录成功");
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.msg);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#EBF3FB",
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
      className="login-page"
    >
      <img
        src={timemanager}
        style={{ width: 700, position: "absolute", bottom: 0, left: 0 }}
      />
      <section style={{ position: "absolute", left: 0, top: 0 }}>
        <Logo />
      </section>
      <main style={{ padding: 200 }}>
        <header>
          <h1 style={{ marginBottom: 20, color: "#155682", textAlign: "left" }}>
            欢迎登陆：
          </h1>
        </header>
        <Card
          title={
            <nav
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {options.map((item) => (
                <RoleOption
                  option={item}
                  onClick={() => setSelect(item.key)}
                  key={item.key}
                  index={select}
                />
              ))}
            </nav>
          }
          style={{ width: 500, height: 360 }}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={finish}
            autoComplete="off"
          >
            <Form.Item
              label={
                <>
                  <span style={{ marginRight: "30px" }}>帐号</span>
                  <UserOutlined />
                </>
              }
              name="info"
              rules={[
                {
                  required: true,
                  message: "信息不能为空!",
                  trigger: "blur",
                },
                {
                  pattern: /(^1[0-9]{10}$) || (^\d{17}(\d|x)$)/g,
                  message: "手机号或身份证格式不正确!",
                  trigger: "blur",
                },
              ]}
            >
              <Input placeholder="请输入手机号/身份证号" />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span style={{ marginRight: "30px" }}>密码</span>
                  <LockOutlined />
                </>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码不能为空!",
                  trigger: "blur",
                },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 5,
                span: 16,
              }}
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" style={{ width: "60%" }}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <footer style={{ display: "flex", justifyContent: "space-between" }}>
            <a style={{ fontSize: 18 }} onClick={() => navigate("/register")}>
              没有账号？
            </a>
            <a style={{ fontSize: 18 }} onClick={() => navigate("/forgetpwd")}>
              忘记密码？
            </a>
          </footer>
        </Card>
      </main>
    </div>
  );
};
export default Login;
