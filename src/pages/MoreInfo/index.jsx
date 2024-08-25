import { Cascader, Form, NavBar, TextArea, Button, Input } from "antd-mobile";
import { useState } from "react";
import { options } from "./data";
const MoreInfo = () => {
  const [visible, setVisible] = useState(false);
  const [area, setArea] = useState("");
  const [value, setValue] = useState([]);
  const submit = () => {};
  return (
    <div className="more-info">
      <NavBar backArrow={false}>完善信息</NavBar>
      <Cascader
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false);
          setArea();
        }}
        value={value}
        onConfirm={setValue}
        onSelect={(val, extend) => {
          console.log("onSelect", val, extend.items);
        }}
      >
        {(items) => {
          if (items.every((item) => item === null)) {
            return "未选择";
          } else {
            return items.map((item) => item?.label ?? "未选择").join("-");
          }
        }}
      </Cascader>
      <div className="perfectForm">
        <Form
          layout="horizontal"
          mode="card"
          onFinish={() => submit()}
          footer={
            <Button
              block
              type="submit"
              onClick={() => console.log("提交注册")}
              color="primary"
              size="large"
            >
              提交
            </Button>
          }
        >
          <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
            <Input type="text" placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="area"
            label="地址"
            extra={
              <Button
                onClick={() => {
                  setVisible(true);
                }}
              >
                选择
              </Button>
            }
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="请输入地址"
              maxLength={100}
              rows={3}
              showCount
              onChange={(value) => setArea(value)}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default MoreInfo;
