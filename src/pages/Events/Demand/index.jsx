import { useLocation, useNavigate } from "react-router-dom";
import {
  Steps,
  Input,
  Radio,
  Button,
  message,
  Tag,
  Flex,
  Popconfirm,
  Modal,
  Form,
} from "antd";
import DescLine from "@/components/DescLine";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delService } from "@/store/modules/service";
import { transfer } from "@/store/modules/trade";
import { Rate } from "antd-mobile";

const Demand = () => {
  // 获取service
  const location = useLocation();
  let servic = location.state.service;
  const [service, setService] = useState(servic);
  const user = useSelector((state) => state.user.userInfo);

  // 处理步骤
  const [current, setCurrent] = useState(0);
  const [auditStatus, setAuditStatus] = useState(0);
  useEffect(() => {
    const now = new Date();
    const todate = (time) => new Date(time);
    const { startTime, endTime, entrollTimeEnd, entrollTimeStart } = service;
    if ("auditStatus" in service) {
      if (todate(entrollTimeStart) > now) {
        setCurrent(2);
      } else if (todate(startTime) > now) {
        setCurrent(3);
      } else if (todate(endTime) > now) {
        setCurrent(4);
      } else if (todate(endTime) < now) {
        setCurrent(6);
      }
      return;
    } else {
      setCurrent(0);
    }
  });
  // 审核状态
  const status = ["未审核", "通过", "驳回"];

  // 显示必要信息
  const infoMap = {
    startTime: "活动时间",
    serviceAddress: "活动地址",
    older: "发起人",
    volunteers: "志愿者们",
    notice: "注意事项",
    adminName: "管理员",
    adminMobile: "联系方式",
  };
  // 进度条
  const steps = [
    {
      title: "发起活动",
      description:
        "您已发起了该活动,右侧是该活动的具体信息，在活动开始前，你可以进行修改或撤回",
    },
    {
      title: "审核结果",
      description: `您活动的审核结果是"${status[auditStatus]}"`,
    },
    {
      title: "活动开启报名",
      description: "您已开启该活动的报名！",
    },
    {
      title: "活动开始",
      description: "活动已开始!",
    },
    {
      title: "活动进行中",
      description: "活动正在进行中!",
    },
    {
      title: "活动结束",
      description: "活动已结束",
    },
    {
      title: "活动反馈",
      description: (
        <div>
          {current === 6 && (
            <Button type="primary" onClick={() => setVisible1(true)}>
              发放时间币
            </Button>
          )}
        </div>
      ),
    },
  ];
  // 展示志愿者
  const colors = ["#5DADE2", "#9E8AA8", "#BDB76B", "#FA8072", "#9BC1BC"];
  // 完成活动
  const [confirm, setConfirm] = useState(1);
  const [feedback, setFeedback] = useState("");
  // 时间币发放函数
  const transFer = async (receipt, amount) => {
    await dispatch(transfer({ password: user.password, receipt, amount })).then(
      (res) => {
        console.log("success");
      }
    );
  };

  // 提交反馈
  const [password, setPassword] = useState("");
  const submit = async () => {
    const trade = {
      id: user.id,
      password,
      to: service.volunteer.map((item) => item.id),
      value: service.timeCoin / service.volunteer.length,
    };
    console.log(trade);
    await dispatch(transfer(trade))
      .then((res) => {
        confirm
          ? message.success("时间币正在发放")
          : message.info("已接受您的反馈");

        navigate("/user/mytrade");
      })
      .catch((err) => {
        message.error("err");
      });
  };
  // 操作
  const navigate = useNavigate();
  const edit = () => {
    navigate("/events/new", { state: { service } });
  };
  const dispatch = useDispatch();
  const delet = async () => {
    await dispatch(delService({ id: service.id })).then(() => {
      message.info("删除成功");
    });
    setTimeout(() => {
      navigate("/events/currentevents");
    }, 300);
  };
  const cancel = () => {
    message.info("已取消");
  };
  // 2 model
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  return (
    <div>
      <Modal
        open={visible1}
        onOk={() => {
          setVisible2(true);
          setVisible1(false);
        }}
        onCancel={() => setVisible1(false)}
        title="请给志愿者们评价一下吧!"
        centered
        okText="确认"
        cancelText="稍等"
      >
        <div style={{ padding: 10 }}>
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
              desc={<Rate defaultValue={5} onChange={(e) => setConfirm(e)} />}
              rowspan={[6, 20]}
            />
          </div>

          {confirm ? (
            <>
              <DescLine
                label={
                  <span style={{ fontWeight: "bold" }}>完成服务后的评价</span>
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
                  <span style={{ fontWeight: "bold" }}>服务中遇到的问题</span>
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
            </>
          )}
        </div>
      </Modal>
      <Modal
        open={visible2}
        onOk={() => {
          setVisible2(false);
          submit();
        }}
        onCancel={() => {
          setVisible2(false);
        }}
        title="发放时间币"
        okText="好了"
        cancelText="稍等"
        centered
      >
        <Form style={{ padding: 40, marginTop: 30 }}>
          <Form.Item
            label={<span style={{ fontWeight: "bold" }}>请输入密码</span>}
          >
            <Input.Password
              placeholder="请输入账号密码"
              rules={[
                {
                  required: true,
                  message: "密码不能为空!",
                  trigger: "blur",
                },
              ]}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>
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
            label={<span style={{ fontWeight: "bold" }}>活动名称</span>}
            desc={service.serviceName}
            rowspan={[6, 16]}
          />
          <DescLine
            label={
              <span style={{ fontWeight: "bold" }}>{infoMap.startTime}</span>
            }
            desc={service.startTime}
            rowspan={[6, 16]}
          />
          <DescLine
            label={
              <span style={{ fontWeight: "bold" }}>
                {infoMap.serviceAddress}
              </span>
            }
            rowspan={[6, 22]}
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
            label={<span style={{ fontWeight: "bold" }}>{infoMap.older}</span>}
            desc={service.older}
          />
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
            label={<span style={{ fontWeight: "bold" }}>{infoMap.notice}</span>}
            block
            desc={service.notice}
          />
        </div>
        <div>
          {current <= 1 ? (
            <>
              <DescLine
                label={<span style={{ fontWeight: "bold" }}>审核结果</span>}
                desc={
                  <>
                    {auditStatus == 2 ? (
                      <span style={{ color: "red" }}>
                        审核未通过,{service.auditRemark},请重写编辑服务
                      </span>
                    ) : (
                      <span>{status[auditStatus]}</span>
                    )}
                  </>
                }
              />

              <div
                style={{
                  width: 300,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button type="primary" onClick={edit}>
                  编辑服务
                </Button>
                <Popconfirm
                  title="删除服务"
                  description="确认删除服务？（删除后不可恢复！）"
                  onConfirm={delet}
                  onCancel={cancel}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button danger>删除服务</Button>
                </Popconfirm>
              </div>
            </>
          ) : (
            <p style={{ color: "red", margin: "10px,0" }}>
              活动开始后不允许再进行编辑和删除操作!
            </p>
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
export default Demand;
