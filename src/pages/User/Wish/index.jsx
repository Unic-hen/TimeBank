import { useLocation } from "react-router-dom";
import { Steps, Input, Radio, Button, Flex, Modal, Tag, message } from "antd";
import DescLine from "@/components/DescLine";
import React, { useEffect, useState } from "react";
import { Rate } from "antd-mobile";
const service = {
  id: 1,
  older: "老李",
  serviceName: "上门按摩",
  serviceDesc: "上门按摩",
  notice: "带上哑铃",
  timeCoin: 100,
  serviceType: "spa",
  startTime: "2021-01-01 10:00:00",
  endTime: "2021-01-01 20:00:00",
  serviceStatus: 1,
  serviceAddress: "北京市朝阳区",
  serviceImg:
    "https://chinavolunteer.mca.gov.cn/site/static/img/0001.3ccbdd8.png",

  servicePhone: "13800138000",
  entrollTimeStart: "2021-01-01 10:00:00",
  entrollTimeEnd: "2021-01-03 10:00:00",
  serviceNums: 10,
  auditStatus: 1,
  adminMobile: "13800138000",
  adminName: "王五",
  volunteers: [
    {
      name: "王五",
      area: "南充",
      description: "我是老人",
      profession: "",
      status: 1,
      age: 70,
      sex: 0,
      mobile: "13800138002",
      password: "123456",
      code: 2,
      role: "older",
      idCard: "12345678901234567890123456789014",
      timeCoin: 0,
      token: "01c18690-d940-40a4-a955-ad874e0ab0c6",
    },
    {
      name: "王五",
      area: "南充",
      description: "我是老人",
      profession: "",
      status: 1,
      age: 70,
      sex: 0,
      mobile: "13800138002",
      password: "123456",
      code: 2,
      role: "older",
      idCard: "12345678901234567890123456789014",
      timeCoin: 0,
      token: "01c18690-d940-40a4-a955-ad874e0ab0c6",
    },
    {
      name: "王五",
      area: "南充",
      description: "我是老人",
      profession: "",
      status: 1,
      age: 70,
      sex: 0,
      mobile: "13800138002",
      password: "123456",
      code: 2,
      role: "older",
      idCard: "12345678901234567890123456789014",
      timeCoin: 0,
      token: "01c18690-d940-40a4-a955-ad874e0ab0c6",
    },
    {
      name: "刘九九",
      area: "南充",
      description: "我是老人",
      profession: "",
      status: 1,
      age: 70,
      sex: 0,
      mobile: "13800138002",
      password: "123456",
      code: 2,
      role: "older",
      idCard: "12345678901234567890123456789014",
      timeCoin: 0,
      token: "01c18690-d940-40a4-a955-ad874e0ab0c6",
    },
    {
      name: "李八八",
      area: "南充",
      description: "我是老人",
      profession: "",
      status: 1,
      age: 70,
      sex: 0,
      mobile: "13800138002",
      password: "123456",
      code: 2,
      role: "older",
      idCard: "12345678901234567890123456789014",
      timeCoin: 0,
      token: "01c18690-d940-40a4-a955-ad874e0ab0c6",
    },
    {
      name: "赵七七",
      area: "南充",
      description: "我是老人",
      profession: "",
      status: 1,
      age: 70,
      sex: 0,
      mobile: "13800138002",
      password: "123456",
      code: 2,
      role: "older",
      idCard: "12345678901234567890123456789014",
      timeCoin: 0,
      token: "01c18690-d940-40a4-a955-ad874e0ab0c6",
    },
  ],
};

const Wish = () => {
  // 服务数据获取
  const location = useLocation();
  const service = {
    ...location.state.service,
    volunteer: [
      {
        name: "王五",
      },
      {
        name: "刘七",
      },
    ],
  };
  // console.log(service);
  // 请假
  const [vocation, setVocation] = useState(0);
  console.log(vocation);
  // 控制步骤
  const [current, setCurent] = useState();
  useEffect(() => {
    if (current == 4) {
      return;
    } else {
      console.log(service);
      const now = new Date();
      if (new Date(service.startTime) > now) {
        setCurent(0);
      } else if (new Date(service.endTime) > now) {
        setCurent(2);
      } else if (new Date(service.endTime) < now) {
        setCurent(3);
      }
    }
  }, [service]);
  // 显示必要信息
  const infoMap = {
    startTime: "活动时间",
    serviceAddress: "活动地址",
    older: "发起人",
    volunteers: "活动伙伴",
    notice: "注意事项",
    vocate: "活动请假",
    vocateReason: "请假原因",
    adminName: "管理员",
    adminMobile: "联系方式",
  };
  // 步骤
  const steps = [
    {
      title: "报名成功",
      description: "请仔细阅读右侧信息！",
    },
    {
      title: "活动开始",
      description: service.startTime,
    },
    {
      title: "活动进行",
      description: "请努力完成活动哦！",
    },
    {
      title: "活动结束",
      description: (
        <div>
          <p>{service.endTime}</p>
          {current === 3 && (
            <Button type="primary" onClick={() => setVisible(true)}>
              去评价活动
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "时间币已到账",
      description: "幸苦啦，请收下您的报酬哦！",
    },
  ];
  // 输入理由
  const [reason, setReason] = useState("");
  const submit = () => {
    console.log(vocation, reason);
    message.success("请假成功");
  };
  // 展示志愿者
  const colors = ["#5DADE2", "#9E8AA8", "#BDB76B", "#FA8072", "#9BC1BC"];
  // 反馈
  const [confirm, setConfirm] = useState(1);
  const [feedback, setFeedback] = useState("");
  const review = () => {
    console.log(confirm, feedback, "submit");
  };
  const handleClick = () => {
    message.success("提交成功");
    setTimeout(() => {
      setCurent(4);
    }, 2000);
  };
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
          handleClick();
        }}
        okText="提交"
        cancelText="稍等"
        centered
        title="评价本次活动"
      >
        <div style={{ padding: 10 }}>
          {current === 3 && (
            <div>
              <p style={{ fontWeight: "bold", margin: "20px 0" }}>
                确认志愿者完成服务？
              </p>

              <div style={{ margin: "20px 0" }}>
                <Radio.Group
                  defaultValue={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
                <DescLine
                  label={<span style={{ fontWeight: "bold" }}>服务评价</span>}
                  desc={
                    <Rate defaultValue={5} onChange={(e) => setConfirm(e)} />
                  }
                />
              </div>

              {confirm ? (
                <>
                  <DescLine
                    label={
                      <span style={{ fontWeight: "bold" }}>
                        完成服务后的评价
                      </span>
                    }
                    desc={
                      <Input.TextArea
                        rows={4}
                        placeholder="请描述服务完成后的评价"
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    }
                    block
                    rowspan={[20, 30]}
                  />
                </>
              ) : (
                <>
                  <DescLine
                    label={
                      <span style={{ fontWeight: "bold" }}>
                        服务中遇到的问题
                      </span>
                    }
                    desc={
                      <Input.TextArea
                        rows={4}
                        placeholder="请描述服务中遇到的问题"
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    }
                    block
                    rowspan={[20, 30]}
                  />
                  <Button type="primary" onClick={review}>
                    提交
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>
      <div
        style={{
          float: "right",
          width: "70%",
          height: 500,
          // borderLeft: "1px dotted #ccc",
          padding: "10px 20px",
        }}
      >
        <div>
          <h3>活动信息:</h3>
          <div style={{ width: 280, height: 180, margin: "20px 0" }}>
            <img
              src={service.serviceImg}
              alt={service.serviceName}
              style={{ width: 280, height: 180, objectFit: "cover" }}
            />
          </div>

          <DescLine
            label={
              <span style={{ fontWeight: "bold" }}>{infoMap.startTime}</span>
            }
            desc={service.startTime}
          />
          <DescLine
            label={
              <span style={{ fontWeight: "bold" }}>
                {infoMap.serviceAddress}
              </span>
            }
            desc={service.serviceAddress}
          />
          {current >= 1 ? (
            <>
              <DescLine
                label={
                  <span style={{ fontWeight: "bold" }}>
                    {infoMap.adminName}
                  </span>
                }
                rowspan={[6, 16]}
                desc={service.adminName}
              />
              <DescLine
                label={
                  <span style={{ fontWeight: "bold" }}>
                    {infoMap.adminMobile}
                  </span>
                }
                rowspan={[6, 16]}
                desc={service.adminMobile}
              />
            </>
          ) : (
            <></>
          )}
          <DescLine
            rowspan={[6, 16]}
            label={
              <span style={{ fontWeight: "bold" }}>{infoMap.volunteers}</span>
            }
            // desc={}
            desc={
              <>
                {!service.volunteer ? (
                  <span style={{ color: "#777" }}>还没志愿者报名哦</span>
                ) : (
                  <Flex gap="4px 0" wrap="wrap">
                    {service.volunteer.map((item, index) => {
                      return (
                        <Tag
                          color={
                            colors[Math.floor(Math.random() * colors.length)]
                          }
                          key={index}
                        >
                          {item.name}
                        </Tag>
                      );
                    })}
                  </Flex>
                )}
              </>
            }
          />
          <DescLine
            label={<span style={{ fontWeight: "bold" }}>{infoMap.older}</span>}
            desc={service.older}
          />
          <DescLine
            label={<span style={{ fontWeight: "bold" }}>{infoMap.notice}</span>}
            desc={service.notice}
          />
          {current ? (
            <p style={{ color: "red", margin: "10px,0" }}>
              活动开始后不允许请假!
            </p>
          ) : (
            <>
              <DescLine
                label={
                  <span style={{ fontWeight: "bold" }}>{infoMap.vocate}</span>
                }
                desc={
                  <>
                    <Radio.Group
                      defaultValue={vocation}
                      onChange={(e) => setVocation(e.target.value)}
                    >
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </Radio.Group>
                  </>
                }
              />
              {vocation && (
                <>
                  <DescLine
                    label={
                      <span style={{ fontWeight: "bold" }}>
                        {infoMap.vocateReason}
                      </span>
                    }
                    desc={
                      <Input.TextArea
                        rows={4}
                        placeholder="请解释请假原因"
                        onChange={(e) => setReason(e.target.value)}
                      />
                    }
                  />
                  <Button type="primary" onClick={submit}>
                    提交
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div
        style={{
          width: "30%",
          height: 500,
          padding: 10,
        }}
      >
        <Steps
          style={{ width: 270 }}
          progressDot
          current={current}
          direction="vertical"
          items={steps}
        />
      </div>
    </div>
  );
};

export default Wish;
