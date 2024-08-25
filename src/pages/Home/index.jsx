import { Card, Button, Space, Table, Flex, Row, Col } from "antd";
import DataBox from "./components/Databox";
import dhzx from "@/assets/images/0dhzx.png";
import hzjm from "@/assets/images/0hzjm.png";
import lxwm from "@/assets/images/0lxwm.png";
import xszd from "@/assets/images/0xszd.png";
import daller from "@/assets/images/daller.png";
import PanelBox from "./components/PanelBox";
import { Link } from "react-router-dom";
import Exhibition from "./components/Exhibition";
import { useState } from "react";
import "./index.scss";
import { table, info } from "./components/static";
import { useSelector } from "react-redux";
const { Meta } = Card;
const overview = [
  { number: 19, text: "实名志愿者", unit: "" },
  { number: 236, text: "总交易额", unit: "" },
  { number: 21, text: "成功交易量", unit: "次" },
  { number: 55, text: "参与社区", unit: "个" },
];

const thead = [
  {
    name: "区块",
    key: "block",
    width: 80,
  },
  {
    name: "交易哈希",
    key: "hash",
    width: 180,
  },
  {
    name: "状态",
    key: "status",
    width: 50,
  },
  {
    name: "支付哈希",
    key: "pay",
    width: 160,
  },
  {
    name: "收银员",
    key: "cashier",
    width: 160,
  },
  {
    name: "支付时间",
    key: "paytime",
    width: 160,
  },
  {
    name: "交易金额",
    key: "volume",
    width: 100,
  },
];
const titles = [
  {
    label: "动态信息",
    key: 1,
  },
  {
    label: "志愿风采",
    key: 2,
  },
  {
    label: "政策文件",
    key: 3,
  },
];
const herfs = [
  {
    label: "兑换中心",
    key: 2,
    url: "",
    img: dhzx,
  },
  {
    label: "联系我们",
    key: 4,
    url: "",
    img: lxwm,
  },
  {
    label: "合作加盟",
    key: 3,
    url: "",
    img: hzjm,
  },

  {
    label: "新手指导",
    key: 1,
    url: "",
    img: xszd,
  },
];

const Home = () => {
  // const [panel, setPanel] = useState();
  // const ws = new WebSocket("ws://47.109.106.81:3000/webSocket/test");
  // ws.onopen = () => {
  //   console.log("open");
  // };
  // // 写个websocket示例
  // ws.onmessage = (event) => {
  //   setPanel(event.data);
  //   // ws.send({
  //   //   msg: "用户hash account:",
  //   //   data: _getAddress_()
  //   // });
  // };
  // ws.onclose = (event) => {
  //   console.log("WebSocket 连接已关闭", event.code, event.reason);
  // };
  // ws.onerror = (error) => {
  //   console.error("WebSocket 发生错误:", error);
  // };
  // console.log(panel, "panel");
  const panel = useSelector((state) => state.trade.trades);
  console.log(panel, "panel");
  return (
    <div style={{ margin: "20px 40px" }} className="home">
      {/* body */}
      <div
        style={{
          float: "right",
          width: "30%",
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card style={{ height: 220 }} title="平台数据概览">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {overview.map(({ number, text, unit }) => {
              number = number >= 10000 ? number / 10000 + "万" : number;
              return <DataBox number={number + unit} desc={text} key={text} />;
            })}
          </div>
        </Card>
        <div
          style={{
            height: 156,
            borderRadius: 10,
            backgroundColor: "#fff",
            display: "flex",
            // justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {herfs.map((item) => {
            return (
              <Link
                to={item.url}
                style={{ width: "50%", height: "50%" }}
                key={item.key}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div
        style={{
          height: 400,
          maxWidth: "68%",
          borderRadius: 10,
          backgroundColor: "#fff",
          padding: 20,
        }}
      >
        <h3 style={{ margin: "0 0 20px" }}>平台数据概览</h3>
        <Meta
          style={{
            // width: "90%",
            // position: "absolute",
            // top: 60,
            overflow: "auto",
            width: "100%",
          }}
          description={
            <PanelBox
              data={table}
              thead={thead}
              style={{ overflow: "auto", width: "100%" }}
            />
          }
        />
      </div>
      <footer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "40px 0",
          height: 250,
        }}
      >
        {titles.map((item) => {
          return (
            <Card
              style={{ width: "32%" }}
              title={
                <p style={{ display: "flex", alignItems: "center" }}>
                  <i>
                    <img src={daller} alt="" style={{ width: 36 }} />
                  </i>
                  <span>{item.label}</span>
                </p>
              }
              key={item.key}
              extra={
                <a
                  href="#"
                  style={{
                    backgroundColor: "#4874CB",
                    color: "#fff",
                    display: "inline-block",
                    width: 48,
                    textAlign: "center",
                    borderRadius: 10,
                  }}
                >
                  更多
                </a>
              }
            >
              <Exhibition list={info} />
            </Card>
          );
        })}
      </footer>
    </div>
  );
};
export default Home;
