import { Form, Button, Input, Select, Flex } from "antd";
import React, { useEffect, useState } from "react";
import ServiceTable from "./components/ServiceTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditEventList } from "@/store/modules/audit";

const EventAudit = () => {
  // 获取数据
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuditEventList({ page: 1, pageSize: 100 }));
  }, [dispatch]);
  let services = useSelector((state) => state.audit.auditEventList);
  // states
  const [data, setData] = useState(services);
  // useEffect(() => {
  //   services = services.filter((item) => item.auditStatus === 0);
  //   setData(services);
  // }, [setData, services]);
  // 搜索功能
  const [result, setResult] = useState(services);
  const [form] = Form.useForm();
  const onFinish = (e) => {
    const res = services.filter(
      (item) =>
        // item.auditStatus == e.searchStatu &&
        item.serviceName.includes(e.serviceName) &&
        item.serviceDesc.includes(e.serviceDesc)
    );
    setResult(res);
    setData(res);
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
    const res = result.filter((item) => item.auditStatus == e);
    setData(res);
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
        initialValues={{ searchStatu: -1 }}
      >
        <Form.Item name="serviceDesc" label="活动内容">
          <Input placeholder="请输入活动内容关键词" />
        </Form.Item>
        <Form.Item label="活动名称" name="serviceName">
          <Input placeholder="请输入活动名称关键词" />
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
            onChange={(e) => select(e)}
            options={[
              { value: -1, label: "全部" },
              { value: 0, label: "待审核" },
              { value: 1, label: "已通过" },
              { value: 2, label: "已驳回" },
              { value: 5, label: "待确认" },
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
export default EventAudit;
