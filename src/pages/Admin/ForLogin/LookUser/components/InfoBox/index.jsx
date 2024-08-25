import { Button, Avatar, Form, Input, Upload, Modal, Radio, Card } from "antd";
import { useState } from "react";
import DescLine from "@/components/DescLine";
import ReviewBox from "@/components/ReviewBox";
const userForm = [
  {
    name: "name",
    label: "昵称",
  },
  {
    name: "mobile",
    label: "电话",
  },
  {
    name: "age",
    label: "年龄",
  },
  {
    name: "idCard",
    label: "身份证",
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

const InfoBox = ({
  user,
  loginAudit,
  setLoginAudit,
  onSubmit,
  tags,
  setSelectedTags,
  selectedTags,
  setDescrip,
}) => {
  const { avatar, description, name } = user;
  const edit = 1;
  return (
    <div>
      {user.name && (
        <div style={{ position: "relative" }}>
          <Card>
            <div style={{ float: "right" }}>
              <Card style={{ border: "none" }}>
                <DescLine
                  label="审核结果"
                  desc={
                    <Radio.Group
                      onChange={(e) => setLoginAudit(e.target.value)}
                    >
                      <Radio value={1}>通过</Radio>
                      <Radio value={2}>驳回</Radio>
                    </Radio.Group>
                  }
                />
                {loginAudit === 2 && (
                  <ReviewBox
                    setDescrip={setDescrip}
                    setSelectedTags={setSelectedTags}
                    selectedTags={selectedTags}
                    tags={tags}
                    style={{ float: "right" }}
                  />
                )}
                <div style={{ textAlign: "right", marginTop: 20 }}>
                  <Button type="primary" onClick={onSubmit}>
                    提交
                  </Button>
                  <Button
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    返回
                  </Button>
                </div>
              </Card>
            </div>
            <div style={{ width: 500 }}>
              <Form labelCol={{ span: 6 }} style={{ width: "400px" }}>
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
                {userForm.map((item) => {
                  return (
                    <Form.Item {...item} key={item.name}>
                      {!edit ? (
                        <Input
                          placeholder={user[item.name]}
                          // value={user[item.name]}
                          disabled={edit}
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
              </Form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
export default InfoBox;
