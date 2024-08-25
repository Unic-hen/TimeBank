import { useLocation, useNavigate } from "react-router-dom";
import { Form, Radio, Checkbox, Input, Button, Card, message } from "antd";
import { useState } from "react";
const Single = ({ test }) => {
  return (
    <div style={{ margin: 10 }}>
      <pre>
        <p style={{ fontSize: 18, lineHeight: 2 }}>{test}</p>
      </pre>
      <Form.Item
        label="选择答案："
        name={`single${test.charAt(0)}`}
        style={{ margin: 5 }}
      >
        <Radio.Group>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};
const Multiple = ({ test }) => {
  return (
    <div style={{ margin: 10 }}>
      <pre>
        <p style={{ fontSize: 18, lineHeight: 2 }}>{test}</p>
      </pre>
      <Form.Item
        label="选择答案："
        name={`muti${test.charAt(0)}`}
        style={{ margin: 5 }}
      >
        <Checkbox.Group>
          <Checkbox value={1}>A</Checkbox>
          <Checkbox value={2}>B</Checkbox>
          <Checkbox value={3}>C</Checkbox>
          <Checkbox value={4}>D</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};

const Judgment = ({ test }) => {
  const [value, setValue] = useState(null);
  return (
    <div style={{ margin: 10 }}>
      <pre>
        <p style={{ fontSize: 18, lineHeight: 2 }}>{test}</p>
      </pre>
      <Form.Item
        label="选择答案："
        name={`judg${test.charAt(0)}`}
        style={{ margin: 5 }}
      >
        <Radio.Group>
          <Radio value={1}>正确</Radio>
          <Radio value={2}>错误</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

const Short = ({ test }) => {
  return (
    <div style={{ margin: 10 }}>
      <pre>
        <p style={{ fontSize: 18, lineHeight: 2 }}>{test}</p>
      </pre>
      <Form.Item
        label="填写答案："
        name={`shor${test.charAt(0)}`}
        style={{ margin: 5 }}
      >
        <Input.TextArea rows={4} style={{ width: 400 }} />
      </Form.Item>
    </div>
  );
};
const Simulation = ({ test }) => {
  return (
    <div style={{ margin: 10 }}>
      <pre>
        <p style={{ fontSize: 18, lineHeight: 2 }}>{test}</p>
      </pre>
      <Form.Item
        label="填写答案："
        name={`simu${test.charAt(0)}`}
        style={{ margin: 5 }}
      >
        <Input.TextArea rows={4} style={{ width: 400 }} />
      </Form.Item>
    </div>
  );
};

const Question = ({ test }) => {
  if (test.includes("题") && !/\d/.test(test)) {
    return (
      <p style={{ fontSize: 18, lineHeight: 2, fontWeight: 800 }}>{test}</p>
    );
  } else if (test.includes("（多选）")) {
    return <Multiple test={test} />;
  } else if (test.includes("（ ）")) {
    return <Judgment test={test} />;
  } else if (test.includes("（单选）")) {
    return <Single test={test} />;
  } else if (test.includes("（情景题）")) {
    return <Simulation test={test} />;
  }
  return <Short test={test} />;
};
const Test = () => {
  const location = useLocation();
  const { exam } = location.state;
  const navigate = useNavigate();
  const handleClick = () => {
    message.info("提交成功！");
    navigate("/train/exams");
  };
  return (
    <div>
      <h1 style={{ margin: 20 }}>{exam.title}</h1>
      <Form onFinish={(e) => console.log(e)}>
        {exam.content.map((item, index) => (
          <>
            <Question key={index} test={item} />
          </>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleClick}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Test;
