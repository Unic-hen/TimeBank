import { Table, Space, Form, Card, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserList } from "@/store/modules/control";
const UserManage = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // states
  const [userName, setUserName] = useState("");
  useEffect(() => {
    dispatch(
      fetchUserList({
        page: 1,
        pageSize: 10,
      })
    )
      .then((res) => {
        console.log("");
      })
      .catch((err) => {
        console.log("获取失败" + err);
      });
  }, [dispatch]);
  const users = useSelector((state) => state.control.userList);
  console.log(users, "users");

  const resolve = () => {};
  const look = (e) => {
    console.log(e);
    navigate("/admin/viewuser", { state: { user: e } });
  };
  const [usersdata, setUsersdata] = useState(users);

  const columns = [
    {
      title: "用户姓名",
      dataIndex: "name",
      width: 100,
      key: "name",
    },
    {
      title: "电话",
      dataIndex: "mobile",
      width: 100,
      key: "mobile",
    },
    {
      title: "地址",
      dataIndex: "area",
      width: 240,
      key: "area",
    },
    {
      title: "年龄",
      key: "age",
      dataIndex: "age",
      width: 100,
      render: (_, { age }) => (
        <>
          {age > 18 ? (
            <span>{age}</span>
          ) : (
            <span style={{ color: "red" }}>{age}</span>
          )}
        </>
      ),
    },
    {
      title: "操作",
      key: "serviceid",
      dataIndex: "serviceid",
      width: 180,
      render: (_, item) => (
        <Space size="middle">
          <a onClick={() => resolve(item)}>删除用户</a>
          <a onClick={() => look(item)}>查看用户</a>
        </Space>
      ),
    },
  ];
  // 搜索
  const search = () => {
    setUsersdata(usersdata.filter((item) => item.name.includes(userName)));
  };
  return (
    <>
      <Card>
        <Form
          name="horizontal_login"
          layout="inline"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{ span: 24 }}
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Form.Item label="用户姓名" name="username">
            <Input
              placeholder="请输入用户姓名关键词"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={search}>
              查询
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table columns={columns} dataSource={usersdata} />
      </Card>
    </>
  );
};
export default UserManage;
