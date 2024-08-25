import { Form, Input, Button, Card, Select, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
const FeedBack = () => {
  const options = [
    { key: 0, value: "系统故障" },
    { key: 1, value: "服务投诉" },
    {
      key: 2,
      value: "操作出错",
    },
    {
      key: 3,
      value: "困难求助",
    },
    {
      key: 4,
      value: "问题反馈",
    },
    {
      key: 5,
      value: "其他",
    },
  ];
  const navigate = useNavigate();
  const finish = () => {
    message.info("提交成功,感谢您的反馈");
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 900 }}>
        <header>
          <h3>您的意见是对我们宝贵的支持！</h3>
        </header>
        <section style={{ display: "flex", justifyContent: "center" }}>
          <Form onFinish={finish} style={{ width: 500 }}>
            <Form.Item label="反馈类型">
              <Select placeholder="选择反馈类型" options={options}></Select>
            </Form.Item>
            <Form.Item label="反馈标题">
              <Input />
            </Form.Item>
            <Form.Item label="反馈内容">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item label="图片附件">
              <Upload.Dragger>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">上传文件</p>
                <p className="ant-upload-hint">
                  请将您的图片文件打包后拖拽到此处
                </p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item label="联系电话">
              <Input />
            </Form.Item>
            <Form.Item label="您的称呼">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "right" }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </section>
      </Card>
    </div>
  );
};

export default FeedBack;
