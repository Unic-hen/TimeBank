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
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditUsersList } from "@/store/modules/audit";
import { fetchAuditSignResult } from "@/store/modules/audit";
let initdata = [
  {
    name: "张三",
    age: 20,
    grade: 0,
    process: 0,
    bodyStatus: 0,
    signStatus: 0,
  },
  {
    name: "李四",
    age: 20,
    grade: 1,
    process: 1,
    bodyStatus: 1,
    signStatus: 0,
  },
];

const SignService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuditUsersList());
  }, [dispatch]);
  //
  const initdata = useSelector((state) => state.audit.auditUsersList);
  const [usersdata, setUsersdata] = useState(initdata);

  // 操作
  const resolve = async (e) => {
    await dispatch(fetchAuditSignResult({ ...e, sign: 1 }))
      .then(() => {
        message.success("审核通过");
        setUsersdata(
          usersdata.map((item) => {
            if (item.mobile === e.mobile) {
              return { ...item, sign: 1 };
            }
            return item;
          })
        );
      })
      .catch((err) => {
        message.error("审核失败");
        console.log(err);
      });
  };
  const look = (e) => {
    navigate("/admin/looksign", { state: { user: e } });
  };
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
      title: "活动评分",
      dataIndex: "grade",
      key: "grade",
      width: 100,
      render: (_, { grade }) => (
        <>{grade ? "正常" : <span style={{ color: "red" }}>异常</span>}</>
      ),
    },
    {
      title: "课程进度",
      dataIndex: "progress",
      key: "progress",
      width: 100,
      render: (_, { progress }) => (
        <>
          {progress ? "已完成" : <span style={{ color: "red" }}>未完成</span>}
        </>
      ),
    },
    {
      title: "身体状态",
      key: "body",
      dataIndex: "body",
      width: 100,
      render: (_, { body }) => (
        <>
          {body ? (
            <span>健康</span>
          ) : (
            <span style={{ color: "red" }}>虚弱</span>
          )}
        </>
      ),
    },
    {
      title: "状态",
      key: "sign",
      dataIndex: "sign",
      width: 100,
      render: (_, { sign }) => <Tag color={color[sign]}>{statusMap[sign]}</Tag>,
    },
    {
      title: "操作",
      key: "mobile",
      dataIndex: "mobile",
      width: 150,
      render: (_, item) => (
        <Space size="middle">
          <a onClick={() => resolve(item)}>通过</a>
          <a onClick={() => look(item)}>查看</a>
        </Space>
      ),
    },
  ];
  const search = (e) => {
    if (e !== "") {
      setUsersdata(initdata.filter((item) => item.name.includes(e)));
      return;
    }
    setUsersdata(initdata);
    return;
  };
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
              onSearch={(e) => search(e)}
            />
          </Form.Item>
          <Form.Item label="审核状态">
            <Select
              style={{ width: 120 }}
              onChange={(value) =>
                setUsersdata(initdata.filter((item) => item.sign === value))
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
export default SignService;
