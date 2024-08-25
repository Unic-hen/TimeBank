import { Form, Button, Input, Select, Flex } from "antd";
import React, { useEffect, useState } from "react";
import ServiceTable from "./components/ServiceTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditEventList } from "@/store/modules/audit";

const Tracking = () => {
  // 获取数据
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuditEventList({ page: 1, pageSize: 10 }));
  }, [dispatch]);
  let services = useSelector((state) => state.audit.auditEventList);
  // states
  const [data, setData] = useState(services);
  // 搜索功能
  const [result, setResult] = useState(services);
  const [form] = Form.useForm();
  const onFinish = (e) => {
    const res = services.filter(
      (item) =>
        item.serviceName.includes(e.serviceName) &&
        item.serviceDesc.includes(e.serviceDesc)
    );
    setData(res);
    setResult(res);
  };
  const onReset = () => {
    form.resetFields();
    setData(services);
  };
  const select = (e) => {
    if (e == -1) {
      setData(result);
      return;
    }
    setData(result.filter((item) => item.serviceStatus == e));
  };
  return (
    <div>
      <Form
        name="searchForm"
        form={form}
        onFinish={onFinish}
        onReset={onReset}
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
        initialValues={{ searchStatu: 0 }}
      >
        <Form.Item
          name="serviceDesc"
          // rules={[{ trigger: onblur}]}
          label="活动内容"
        >
          <Input
            placeholder="请输入活动内容关键词"
            onChange={({ target }) => setServiceDesc(target.value)}
          />
        </Form.Item>
        <Form.Item label="活动名称" name="serviceName">
          <Input
            placeholder="请输入活动名称关键词"
            onChange={({ target }) => setServiceName(target.value)}
          />
        </Form.Item>
        <Form.Item style={{ width: 150 }}>
          <Flex justify="space-between">
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Flex>
        </Form.Item>
        <Form.Item label="审核状态" name="searchStatu">
          <Select
            style={{ width: 120 }}
            onChange={(value) => select(value)}
            options={[
              { value: -1, label: "全部" },
              { value: 0, label: "未开始" },
              { value: 1, label: "活动中" },
              { value: 2, label: "已结束" },
            ]}
          />
        </Form.Item>
      </Form>
      <ServiceTable
        data={data}
        style={{
          marginTop: "40px",
        }}
      />
    </div>
  );
};

export default Tracking;
