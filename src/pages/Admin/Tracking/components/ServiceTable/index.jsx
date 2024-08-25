import React, { useEffect, useState } from "react";
import { Space, Table, Modal, message, Tag } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchServiceResult } from "@/store/modules/audit";
import { useDispatch, useSelector } from "react-redux";
import ReviewBox from "@/components/ReviewBox";
import activitype from "@/utils/activitype";

const ServiceTable = ({ data, style }) => {
  // states
  const user = useSelector((state) => state.user.userInfo);
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    navigate("/admin/info", { state: { ...e, track: true } });
  };
  const location = useLocation();
  useEffect(() => {
    try {
      const { e } = location.state;
      setDatas(
        data.map((item) => {
          if (item.auditId === e.auditId) {
            return { ...item, auditStatus: 2, key: item.id };
          }
          return { ...item, key: item.id };
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [location]);
  // 通过
  const resolve = async (e) => {
    if (e.auditStatus === 1) {
      message.info("该服务已经通过审核");
      return;
    }
    const result = {
      // ...item,
      auditId: e.auditId,
      adminMobile: user.mobile,
      // adminName: user.name,
      auditReason: "",
      auditRemark: "",
      auditStatus: 1,
    };
    console.log(result);
    await dispatch(fetchServiceResult(result)).then((res) => {
      console.log(res);
    });

    message.success("审核通过");
    // window.location.reload();
  };
  const statusMap = {
    0: "未开始",
    1: "活动中",
    2: "已结束",
  };
  const color = ["green", "blue", "cyan"];
  const look = (e) => {
    navigate("/admin/info", { state: e });
  };

  const columns = [
    {
      title: "活动名称",
      dataIndex: "serviceName",
      width: 150,
      key: "serviceName",
      render: (text, service) => (
        <a onClick={() => handleClick(service)}>{text}</a>
      ),
    },
    {
      title: "活动类型",
      dataIndex: "serviceType",
      key: "serviceType",
      width: 60,
      render: (text) => {
        if (!text) {
          return "-";
        }
        return activitype.filter((item) => item.value == text)[0].label;
      },
    },
    {
      title: "活动内容",
      dataIndex: "serviceDesc",
      key: "serviceDesc",
      width: 250,
    },
    {
      title: "时间币",
      key: "timeCoin",
      dataIndex: "timeCoin",
      width: 60,
    },
    {
      title: "状态",
      key: "serviceStatus",
      dataIndex: "serviceStatus",
      width: 60,
      render: (_, { serviceStatus }) => (
        <Tag color={color[serviceStatus]}>{statusMap[serviceStatus]}</Tag>
      ),
    },
    {
      title: "操作",
      key: "serviceid",
      dataIndex: "serviceid",
      width: 150,
      render: (_, item) => (
        <Space size="middle">
          <a onClick={() => look(item)}>查看</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        style={style}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};
export default ServiceTable;
