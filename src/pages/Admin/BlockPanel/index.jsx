import {
  Card,
  Collapse,
  Tag,
  message,
  Modal,
  theme,
  Form,
  Input,
  Popover,
  Button,
  Flex,
  Select,
} from "antd";
import "./index.scss";
import bg from "@/assets/images/panel/pn.svg";
import { data } from "./components/static";
import { useEffect, useRef, useState } from "react";
import { lineConfig, pieConifig } from "./components/config";
import * as echarts from "echarts";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const Label = ({ block, nums, time }) => {
  const timeDifference = (time) => {
    const now = new Date();
    const inputTime = new Date(time);
    const difference = now - inputTime;
    if (difference < 60 * 1000) {
      return `${Math.floor(difference / 1000)}s前`;
    } else if (difference < 60 * 60 * 1000) {
      return `${Math.floor(difference / (60 * 1000))}m前`;
    } else if (difference < 24 * 60 * 60 * 1000) {
      return `${Math.floor(difference / (60 * 60 * 1000))}h前`;
    } else {
      return `${time.substring(0, 10)}`;
    }
  };
  return (
    <p
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span
        style={{
          width: 60,
          textAlign: "center",
          borderRadius: 5,
        }}
      >
        <span style={{ color: "#999", fontSize: 12 }}>区块号:</span>
        <span
          style={{
            fontSize: 16,
            color: "#009DF8",
          }}
        >
          {block}
        </span>
      </span>
      <span>
        <span
          style={{
            color: "#999",
            width: 80,
            fontSize: 12,
            fontWeight: 800,
            marginRight: 5,
          }}
        >
          交易数量:
        </span>
        <span style={{ color: "#99BCDB", fontSize: 16 }}>{nums}</span>
      </span>
      <span
        style={{
          width: 80,
          lineHeight: 2,
          textAlign: "center",
          fontSize: 12,
          color: "#999",
        }}
      >
        <span>{timeDifference(time)}</span>
      </span>
    </p>
  );
};
const Info = ({ index, hash, time, lasthash }) => {
  return (
    <div style={{ display: "flex", textAlign: "left" }}>
      <section>
        <div
          style={{
            width: 120,
            height: "100%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            marginRight: 10,
            fontSize: 20,
            fontFamily: "fantasy",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p style={{ zIndex: 99, lineHeight: 10, color: "#fff" }}>{index}</p>
        </div>
      </section>
      <section className="block-info">
        <p>
          <span id="label">区块哈希：</span>
          <div id="desc">{hash}</div>
        </p>
        <p>
          <span id="label">产生时间：</span>
          <p id="desc">{time}</p>
        </p>
        <p>
          <span id="label">上一区块哈希：</span>
          <p id="desc">{lasthash}</p>
        </p>
      </section>
    </div>
  );
};
const BlockNode = ({ block }) => {
  // 样式
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  //   节点
  const items = block
    .sort((a, b) => b.key - a.key)
    .map((item, index) => {
      return {
        key: item.key,
        label: <Label block={item.key} nums={item.nums} time={item.time} />,
        showArrow: false,
        children: (
          <Info
            hash={item.hash}
            nums={item.nums}
            time={item.time}
            index={item.key}
            lasthash={item.lasthash}
          />
        ),
        style: panelStyle,
      };
    });
  return (
    <div
      style={{ overflowY: "scroll", border: "none", width: 360, height: 560 }}
    >
      <Collapse
        bordered={false}
        accordion
        style={{
          background: token.colorBgContainer,
        }}
        items={items}
      />
    </div>
  );
};

const BlockPanel = () => {
  const [id, setId] = useState(data.length - 1);
  const item = data[id];
  // form
  const form = Form.useForm();
  const next = () => {
    if (id + 1 < data.length) {
      return setId(id + 1);
    }
    return message.info("已经是最新节点了");
  };
  const last = () => {
    if (id - 1 >= 0) {
      return setId(id - 1);
    }
    return message.info("已经是第一节点了");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    // console.log(form);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 更多节点
  const [more, setMore] = useState(false);
  // 图表
  const line = useRef(null);
  const pie = useRef(null);
  useEffect(() => {
    const blockLine = echarts.init(line.current);
    blockLine.setOption(lineConfig);
    const blockpie = echarts.init(pie.current);
    blockpie.setOption(pieConifig);
  });
  const deleteBlock = () => {};
  // 编辑信息
  const [edit, setEdit] = useState(false);
  const submit = () => {};
  return (
    <div className="block-panel">
      <Modal
        title="新建节点"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form>
          <Form.Item label="节点名称" name="nodeName">
            <Input placeholder="在这里给节点命名" />
          </Form.Item>
          <Form.Item label="节点备注" name="note">
            <Input.TextArea placeholder="给这个节点备注信息" />
          </Form.Item>
        </Form>
      </Modal>
      <Card title="区块面板">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <section>
            <Card
              title={
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <Popover
                    placement="bottom"
                    content={
                      <div style={{ color: "#666", fontSize: 14 }}>
                        {item.note}
                      </div>
                    }
                  >
                    <span
                      style={{
                        // position: "fixed",
                        // color: "#009DF8",
                        color: "#999",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                        }}
                      >
                        节点：
                      </span>
                      <span style={{ fontSize: 16, color: "#009DF8" }}>
                        {item.id}
                      </span>
                    </span>
                  </Popover>
                  <span>
                    <LeftOutlined onClick={last} />
                    <Popover
                      placement="top"
                      content={
                        <div style={{ color: "#666", fontSize: 14 }}>
                          双击可修改节点名称
                        </div>
                      }
                    >
                      <span
                        style={{
                          fontSize: 16,
                          // position: "fixed",
                          color: "#009DF8",
                          margin: "0px 10px",
                        }}
                      >
                        {item.name}
                      </span>
                    </Popover>
                    <RightOutlined onClick={next} />
                  </span>
                  <span style={{ color: "#888" }}>
                    <span>状态:</span>
                    <span style={{ fontWeight: 400, marginLeft: 10 }}>
                      {item.status ? "正常" : "异常"}
                    </span>
                  </span>
                </p>
              }
              hoverable
              style={{
                overflow: "hidden",
              }}
            >
              <BlockNode block={item.block} key={item.id} />
            </Card>
          </section>

          <section style={{ width: "60%" }}>
            <Card style={{ display: "flex" }}>
              <div
                ref={line}
                style={{ width: 360, height: 300, float: "left" }}
              ></div>
              <div
                ref={pie}
                style={{ width: 300, height: 300, float: "right" }}
              ></div>
            </Card>
            <Card
              style={{ width: "100%" }}
              title={
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    <span style={{ fontSize: 14, marginRight: 20 }}>操作:</span>
                    <span>
                      <Button
                        onClick={() => setEdit(true)}
                        style={{ margin: "0px 10px" }}
                      >
                        编辑信息
                      </Button>
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        style={{ margin: "0px 10px" }}
                      >
                        新增节点
                      </Button>
                      <Button
                        onClick={deleteBlock}
                        style={{ margin: "0px 10px" }}
                      >
                        删除节点
                      </Button>
                    </span>
                  </span>
                  <span>
                    <Select
                      style={{ width: 100, textAlign: "center" }}
                      options={data.map((item) => {
                        return { label: item.name, value: item.id };
                      })}
                      onChange={(e) => setId(e - 112)}
                    />
                  </span>
                </p>
              }
            >
              {/* <p>
            节点:
            <span>
              {data.map((item) => {
                return <Tag key={item.id}>{item.name}</Tag>;
              })}
              {more ? <span></span> : <span>更多</span>}
            </span>
          </p> */}

              {edit ? (
                <div
                  style={{
                    margin: 20,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Form style={{ width: 400 }}>
                    <Form.Item label="节点名称" name="nodeName">
                      <Input placeholder="在这里给节点命名" />
                    </Form.Item>
                    <Form.Item label="节点备注" name="note">
                      <Input.TextArea placeholder="给这个节点备注信息" />
                    </Form.Item>
                    <Form.Item>
                      <div style={{ textAlign: "right", marginTop: 20 }}>
                        <Button onClick={submit} type="primary">
                          提交
                        </Button>
                        <Button
                          style={{ marginLeft: 20 }}
                          onClick={() => {
                            setEdit(false);
                          }}
                        >
                          取消
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <></>
              )}
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};
export default BlockPanel;
