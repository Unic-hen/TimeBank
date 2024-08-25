import {
  Table,
  Space,
  Form,
  Card,
  Input,
  Select,
  Button,
  message,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAuditInfoResult,
  fetchAuditUsersList,
} from "@/store/modules/audit";
import { useEffect, useState } from "react";
import { search } from "@/utils/audit";
const usersdata = [
  {
    name: "张三",
    realName: 1,
    fillInfo: 1,
    age: 30,
    status: 1,
  },
  {
    name: "李四",
    realName: 0,
    fillInfo: 0,
    age: 20,
    status: 0,
  },
];

const ForLogin = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 获取并初始化数据
  useEffect(() => {
    dispatch(fetchAuditUsersList());
  }, [dispatch]);
  const initdata = useSelector((state) => state.audit.auditUsersList);
  const [usersdata, setUsersdata] = useState(initdata);
  // 提交结果
  const resolve = async (e) => {
    await dispatch(fetchAuditInfoResult({ ...e, info: 1 }))
      .then(() => {
        message.success("审核通过");
        setUsersdata(
          usersdata.map((item) => {
            if (item.mobile === e.mobile) {
              return { ...item, info: 1 };
            }
            return item;
          })
        );
      })
      .catch(() => {
        message.error("审核失败");
      });
  };
  // 查看
  const look = (e) => {
    console.log(e);
    navigate("/admin/lookuser", { state: { user: e } });
  };
  // 渲染
  const statusMap = {
    0: "未审核",
    1: "人工通过",
    2: "人工驳回",
    3: "系统通过",
    4: "系统驳回",
  };
  const color = ["green", "blue", "red", "gold", "purple", "cyan"];

  const columns = [
    {
      title: "用户姓名",
      dataIndex: "name",
      width: 100,
      key: "name",
    },
    {
      title: "实名认证",
      dataIndex: "verify",
      key: "verify",
      width: 100,
      render: (_, { verify }) => (
        <>{verify ? "已完成" : <span style={{ color: "red" }}>未完成</span>}</>
      ),
    },
    {
      title: "信息填写",
      dataIndex: "fill",
      key: "fill",
      width: 100,
      render: (_, { fill }) => (
        <>{fill ? "已完成" : <span style={{ color: "red" }}>未完成</span>}</>
      ),
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
      title: "状态",
      key: "info",
      dataIndex: "info",
      width: 100,
      render: (_, { info }) => <Tag color={color[info]}>{statusMap[info]}</Tag>,
    },
    {
      title: "操作",
      key: "serviceid",
      dataIndex: "serviceid",
      width: 150,
      render: (_, item) => (
        <Space size="middle">
          <a onClick={() => resolve(item)}>通过</a>
          <a onClick={() => look(item)}>查看</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Card>
        <Form
          layout="inline"
          style={{ width: "100%", display: "flex", justifyContent: "right" }}
        >
          <Form.Item style={{}}>
            <Input.Search
              placeholder="请输入用户姓名关键词"
              allowClear
              enterButton="搜索"
              size="middle"
              onSearch={(e) => search(e, setUsersdata, initdata)}
            />
          </Form.Item>
          <Form.Item label="审核状态">
            <Select
              style={{ width: 120 }}
              onChange={(value) =>
                setUsersdata(initdata.filter((item) => item.info === value))
              }
              options={[
                { value: 0, label: "未审核" },
                { value: 1, label: "人工通过" },
                { value: 2, label: "人工驳回" },
                { value: 3, label: "系统通过" },
                { value: 4, label: "系统驳回" },
              ]}
            />
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table columns={columns} dataSource={usersdata} />
      </Card>
    </>
  );
};
export default ForLogin;
