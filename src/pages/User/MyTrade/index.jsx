import { Table, Form, Input, DatePicker, Switch, Select } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./index.scss";
import { _getAddress_ } from "@/store/modules/trade";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "@/store/modules/trade";
import * as echarts from "echarts";
import { histChart, pieChart } from "./components/config";
const { RangePicker } = DatePicker;

const MyTrade = () => {
  const dispatch = useDispatch();

  // 获取数据
  useEffect(() => {
    dispatch(history());
  }, [dispatch]);
  // states
  const historyTrade = useSelector((state) => state.trade.historyTrade);
  const user = useSelector((state) => state.user.userInfo);
  const mytrade = historyTrade.filter(
    (item) => item.pay == user.name || item.cashier == user.name
  );
  console.log(mytrade);
  const [table, setTable] = useState(mytrade);

  console.log(table, "table");

  // // webscket实时更新
  // const [panel, setPanel] = useState([]);
  // const ws = new WebSocket("ws://47.109.106.81:3000/webSocket/test");
  // ws.onopen = () => {
  //   console.log("open");
  //   ws.send({
  //     msg: "用户hash account:",
  //     data: _getAddress_(),
  //   });
  // };
  // // 写个websocket示例
  // ws.onmessage = (event) => {
  //   setPanel(event.data);
  // };
  // ws.onclose = (event) => {
  //   console.log("WebSocket 连接已关闭", event.code, event.reason);
  // };
  // ws.onerror = (error) => {
  //   console.error("WebSocket 发生错误:", error);
  // };
  // 配置
  const columns = [
    {
      title: "区块",
      dataIndex: "block",
      key: "block",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>
          {status === "1" ? (
            <span>
              <CheckCircleOutlined />
              成功
            </span>
          ) : (
            <span>
              <CloseCircleOutlined />
              失败
            </span>
          )}
        </span>
      ),
    },
    {
      title: "收款人",
      dataIndex: "cashier",
      key: "cashier",
    },
    {
      title: "支付人",
      dataIndex: "pay",
      key: "pay",
    },
    {
      title: "支付时间",
      dataIndex: "paytime",
      key: "paytime",
    },
    {
      title: "交易金额",
      dataIndex: "volume",
      key: "volume",
      render: (volume) => (
        <div>
          {volume > 0 ? (
            <span style={{ color: "blue" }}>+{volume}</span>
          ) : (
            <sapn style={{ color: "red" }}>{volume}</sapn>
          )}
        </div>
      ),
      sorter: (a, b) => a.volume - b.volume,
    },
  ];
  // funcs
  const timeFilter = (value) => {
    setTable(
      historyTrade.filter((item) => {
        new Date(item.paytime).getTime() >= new Date(value[0]).getTime() &&
          new Date(item.paytime).getTime() <= new Date(value[1]).getTime();
      })
    );
  };
  const hist = useRef(null);
  const pie = useRef(null);
  useEffect(() => {
    // hist
    const HistChart = echarts.init(hist.current);
    HistChart.setOption(histChart);
    // pie
    const PieChart = echarts.init(pie.current);
    PieChart.setOption(pieChart);
  }, []);
  const comeFilter = (come) => {
    if (come) {
      setTable(mytrade.filter((item) => item.cashier == user.name));
    } else {
      setTable(mytrade.filter((item) => item.pay == user.name));
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <main className="left" style={{ width: "60%" }}>
        <header>
          <Form
            layout="inline"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Form.Item label="交易时间" name="paytime">
              <RangePicker
                onChange={(e) => timeFilter(e.map((item) => new Date(item)))}
              />
            </Form.Item>
            <Form.Item label="交易类型" name="pay">
              <Select
                style={{ width: 120 }}
                onChange={(e) => comeFilter(e)}
                options={[
                  { value: true, label: "收入" },
                  { value: false, label: "支出" },
                ]}
              ></Select>
            </Form.Item>
          </Form>
          {/* <Switch
            checkedChildren="收入"
            unCheckedChildren="支出"
            defaultChecked
            onChange={(e) => setCome(!e)}
          /> */}
        </header>
        <section>
          <Table
            columns={columns}
            dataSource={table}
            pagination={{ pageSize: 6 }}
          />
        </section>
      </main>
      <main className="right" style={{ width: "40%" }}>
        <div ref={hist} style={{ width: "100%", height: 300 }}></div>
        <div ref={pie} style={{ width: "100%", height: 300 }}></div>
      </main>
    </div>
  );
};
export default MyTrade;
