import { Steps, Card, Form, Input, Radio, Button, Flex, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { fetchRegister, getAuthcode } from "@/store/modules/user";
import { createAccount } from "@/store/modules/trade";
let data = {
  mobile: "",
  authCode: "",
  password: "",
  password_confirm: "",
  name: "",
  idCard: "",
  area: "",
  description: "",
};
const StepForm1 = ({ setStep }) => {
  const [mobile, setMobile] = useState("");
  const [time, setTime] = useState(60); // 验证码
  const dispatch = useDispatch();
  // 验证码
  let tmptime = 60;
  const getcode = async (mobile) => {
    await dispatch(getAuthcode({ mobile })).then((res) => {
      console.log(res);
      message.info(res.data.msg);
    });
    console.log("222222");
    // 验证码接口
    // 60s内不再发送

    const timer = setInterval(() => {
      --tmptime;
      if (tmptime === 0) {
        clearInterval(timer);
        setTime(60);
      }
      setTime(tmptime);
      // console.log(time, tmptime, "time");
    }, 1000);
  };
  // 下一步

  const next = (e) => {
    console.log("next");
    const { mobile, authCode, password } = e;
    if (mobile.length == 11 && authCode.length == 6 && password) {
      setStep(1);
    }
    data = { ...e };
    console.log(data, "next");
  };
  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onFinish={next}
      initialValues={{ code: 1, ...data }}
      // form={data ? data : null}
    >
      <Form.Item label="注册身份" name="code">
        <Radio.Group>
          <Radio value={1}>用户</Radio>
          <Radio value={0}>管理员</Radio>
        </Radio.Group>
      </Form.Item>
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
        <Input
          placeholder="请输入手机号"
          onChange={(e) => setMobile(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        required
        label="短信验证码"
        name="authCode"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
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
              <a onClick={() => getcode(mobile)}>发送验证码</a>
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
        <Input.Password placeholder="请输入" />
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
        <Input.Password placeholder="请再次输入" />
      </Form.Item>
      <Flex justify="end">
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Flex>
    </Form>
  );
};

const StepForm2 = ({ setStep, submit }) => {
  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{ sex: 0 }}
      onFinish={submit}
    >
      <Form.Item label="性别" name="sex">
        <Radio.Group>
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="name" label="昵称">
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item
        name="idCard"
        label="身份证号"
        rules={[
          {
            required: true,
            message: "身份证号不能为空!",
            trigger: "blur",
          },
          {
            len: 18,
            message: "身份证号格式不正确!",
            trigger: "blur",
          },
        ]}
      >
        <Input placeholder="请输入身份证号" />
      </Form.Item>

      <Form.Item name="area" label="地址">
        <Input placeholder="请输入地址" />
      </Form.Item>
      <Form.Item name="description" label="个人描述">
        <Input.TextArea placeholder="请输入个人描述" value={""} />
      </Form.Item>
      <Flex justify="space-around">
        <Button
          onClick={() => {
            setStep(0);
          }}
        >
          上一步
        </Button>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Flex>
    </Form>
  );
};

const Register = () => {
  // states
  const [step, setStep] = useState(0); //步骤器
  // const [code, setCode] = useState(1); //角色
  const steps = [
    {
      title: "设置密码",
      status: step ? "finish" : "process",
    },
    {
      title: "完善信息",
      status: step ? "process" : "wait",
    },
    {
      title: "跳转登陆",
    },
  ];

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // func

  // 提交
  const submit = async (e) => {
    data = { ...data, ...e };
    console.log(data, "submit");
    // 调用接口
    dispatch(fetchRegister(data))
      .then((res) => {
        if (res === "验证码已过期") {
          message.error(res);
          return;
        } else if (res === "验证码错误") {
          message.error(res);
          return;
        }
        message.loading("注册成功,即将跳转登陆", 0.8);
        setTimeout(() => navigate("/login"), 800);
      })
      .catch((err) => {
        console.log(err);
        message.error("注册失败:" + err);
      });
    const { password } = data;
    // await dispatch(createAccount({ password })).then((res) => {
    //   message.info("您的时间币账号正在创建中...", 1000);
    // });
  };
  console.log(step, "step");
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
    >
      <section style={{ position: "absolute", left: 0, top: 0 }}>
        <Logo />
      </section>

      <main
        style={{
          width: 900,
        }}
      >
        <header>
          <h1 style={{ marginBottom: 20, color: "#155682", textAlign: "left" }}>
            欢迎注册：
          </h1>
          <Steps current={1} items={steps} />
        </header>
        <main
          style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        >
          <Card
            style={{
              width: 700,
              height: 420,
            }}
          >
            {!step ? (
              <StepForm1 setStep={setStep} />
            ) : (
              <StepForm2 setStep={setStep} submit={submit} />
            )}
          </Card>
        </main>
      </main>
    </div>
  );
};
export default Register;
