import timemanager from "@/assets/images/timemanager.svg";
import { Card, Form, Input, Button, message } from "antd";
import Logo from "@/components/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ForgetPwd = () => {
  // state
  const [time, setTime] = useState(60);
  // hooks
  const navigate = useNavigate();
  // funcs
  let tmptime = 60;
  const getcode = () => {
    console.log("获取验证码:222222");
    // 验证码接口
    // 60s内不再发送
    const timer = setInterval(() => {
      --tmptime;
      setTime(tmptime);
      if (tmptime === 0) {
        clearInterval(timer);
        setTime(60);
      }
    }, 1000);
  };
  const finish = (e) => {
    console.log(e);
    message.info("重置成功，即将跳转到登录");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };
  return (
    <div
      style={{
        backgroundColor: "#EBF3FB",
        display: "flex",
        justifyContent: "center",
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
      <main>
        <Card title="重置密码" style={{ width: 500, height: 360 }}>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            onFinish={finish}
          >
            <Form.Item
              label="手机号"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "手机号不能为空!",
                  trigger: "blur",
                },
                {
                  pattern: /^1[0-9]{10}$/,
                  message:
                    "手机号格式不正确，请输入11位数字，以1开头，如：13712345678",
                  trigger: "blur",
                },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              required
              label="短信验证码"
              name="auth_code"
              rules={[
                {
                  len: 6,
                  message: "请输入6位验证码",
                  trigger: "blur",
                },
                {
                  required: true,
                  message: "验证码不能为空!",
                  trigger: "blur",
                },
              ]}
            >
              <Input.Search
                placeholder="请输入验证码"
                enterButton={
                  time == 60 || 0 ? (
                    <a onClick={() => getcode()}>发送验证码</a>
                  ) : (
                    <a style={{ color: "#ffffff" }}>已发送({time})</a>
                  )
                }
              />
            </Form.Item>
            <Form.Item
              required
              label="设置密码"
              name="password"
              rules={[
                { required: true, message: "请输入密码" },
                { min: 8, message: "密码至少需要8位" },
                {
                  regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
                  message: "请输入包含大写字母、小写字母和数字的密码",
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              required
              label="确认密码"
              name="password_confirm"
              rules={[
                { required: true, message: "请再次输入密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致!"));
                  },
                }),
              ]}
            >
              <Input placeholder="请再次输入" />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default ForgetPwd;
