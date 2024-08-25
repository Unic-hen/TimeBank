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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAuditUsersList } from "@/store/modules/audit";
import { fetchAuditRealeaseResult } from "../../../store/modules/audit";
import { search } from "@/utils/audit";
const initdata = [
  {
    name: "张三",
    age: 20,
    grade: 0,
    timeCoin: 0,
    creditStatus: 0,
    releaseStatus: 0,
  },
  {
    name: "张六",
    age: 16,
    grade: 1,
    timeCoin: 100,
    creditStatus: 1,
    releaseStatus: 0,
  },
];
const releaseEvents = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 获取数据
  useEffect(() => {
    dispatch(fetchAuditUsersList());
  }, [dispatch]);

  const initdata = useSelector((state) => state.audit.auditUsersList);
  const [usersdata, setUsersdata] = useState(initdata);
  // 处理数据展示
  const location = useLocation();
  useEffect(() => {
    setUsersdata(
      usersdata.map((item) => {
        if (!item.releaseStatus) {
          return {
            ...item,
            releaseStatus:
              item.grade && item.creditStatus && item.timeCoin > 50 ? 3 : 4,
          };
        }
      })
    );
    //
    // try {
    //   const { e } = location.state;
    //   setUsersdata(
    //     usersdata.map((item) => {
    //       if (item.name === e.name) {
    //         return { ...item, releaseStatus: 1 };
    //       }
    //       return item;
    //     })
    //   );
    // } catch (err) {}
    //
  }, [location]);
  // 提交通过
  const resolve = async (e) => {
    const review = { ...e, release: 1 };
    console.log(review);
    await dispatch(fetchAuditRealeaseResult(review))
      .then(() => {
        message.success("审核通过");
        setUsersdata(
          usersdata.map((item) => {
            if (item.name === e.name) {
              return { ...item, releases: 1 };
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
  // 查看
  const look = (e) => {
    navigate("/admin/lookrelease", { state: { user: e } });
  };
  // 渲染表格
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
      title: "时间币量",
      dataIndex: "coin",
      key: "coin",
      width: 100,
      render: (_, { coin }) => (
        <>
          {coin ? (
            <span>充足</span>
          ) : (
            <span style={{ color: "red" }}>不足</span>
          )}
        </>
      ),
    },
    {
      title: "信用",
      key: "credit",
      dataIndex: "credit",
      width: 100,
      render: (_, { credit }) => (
        <>
          {credit ? (
            <span>正常</span>
          ) : (
            <span style={{ color: "red" }}>失信</span>
          )}
        </>
      ),
    },
    {
      title: "状态",
      key: "releases",
      dataIndex: "releases",
      width: 100,
      render: (_, { releases }) => (
        <Tag color={color[releases]}>{statusMap[releases]}</Tag>
      ),
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
                setUsersdata(initdata.filter((item) => item.release === value))
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
export default releaseEvents;
