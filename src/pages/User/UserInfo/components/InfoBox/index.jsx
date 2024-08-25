import { Button, Avatar, Form, Input, Upload, Modal } from "antd";
import { Card } from "antd-mobile";
import { useState } from "react";

const userForm = [
  {
    name: "name",
    label: "昵称",
  },
  {
    name: "mobile",
    label: "电话",
    disabled: true,
  },
  {
    name: "age",
    label: "年龄",
    disabled: true,
  },
  {
    name: "sex",
    label: "性别",
    disabled: true,
  },
  {
    name: "idCard",
    label: "身份证",
    disabled: true,
  },
  {
    name: "profession",
    label: "职业",
  },
  {
    name: "area",
    label: "地址",
  },
];

const InfoBox = ({ user, edit, editpwd, submit, change }) => {
  const { avatar, description, name } = user;
  //   提交头像
  const onChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div>
      {user.name && (
        <div style={{ position: "relative" }}>
          <Card>
            <div style={{ width: 500 }}>
              <Form
                labelCol={{ span: 6 }}
                onFinish={(e) => submit(e)}
                style={{ width: "400px" }}
              >
                <Form.Item label="头像" name="name">
                  <>
                    <Avatar
                      size={64}
                      src={avatar}
                      style={{
                        backgroundColor: edit ? "#4EBCDA" : "#fff",
                      }}
                    >
                      {!edit ? (
                        <Upload
                          name="file"
                          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                          onChange={onChange}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <a style={{ color: "#1677FF" }}>上传</a>
                        </Upload>
                      ) : (
                        name
                      )}
                    </Avatar>
                  </>
                </Form.Item>
                <Form.Item label="等级" name="level" disabled>
                  <span>一星级</span>
                </Form.Item>
                {userForm.map((item) => {
                  return (
                    <Form.Item {...item} key={item.name}>
                      {!edit ? (
                        <Input
                          placeholder={user[item.name]}
                          // value={user[item.name]}
                          disabled={item.disabled ? item.disabled : edit}
                        />
                      ) : (
                        <span>{user[item.name]}</span>
                      )}
                    </Form.Item>
                  );
                })}
                <Form.Item label="个人介绍" name="description">
                  {!edit ? (
                    <Input.TextArea
                      placeholder={description}
                      disabled={edit}
                      rows={4}
                    />
                  ) : (
                    <span>{description}</span>
                  )}
                </Form.Item>
                <div style={{ textAlign: "right", margin: 10 }}>
                  {!edit && (
                    <Button type="primary" htmlType="submit">
                      提交
                    </Button>
                  )}
                </div>
              </Form>
            </div>
            {editpwd && (
              <Form
                labelCol={{ span: 6 }}
                onFinish={(e) => change(e)}
                style={{ width: "400px" }}
              >
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
                        return Promise.reject(
                          new Error("两次输入的密码不一致!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input placeholder="请再次输入" />
                </Form.Item>
                <div style={{ textAlign: "right", margin: 10 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </div>
              </Form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
export default InfoBox;
