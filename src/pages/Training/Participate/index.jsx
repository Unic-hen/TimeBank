import { Select, Form, Button } from "antd";
import { useState } from "react";
import activitype from "@/utils/activitype";
import TrainBox from "./components/TrainBox";
import { useNavigate } from "react-router-dom";
const trainList = [
  {
    id: 0,
    name: "志愿者伦理道德与行为素养",
    type: 1,
    mentor: "吉林大学生命科学学院",
    address: "线上",
    startTime: "",
    endTime: "",
    mobile: "",
    people: "居家老人",
    desc: "生命力量—志愿者培训系列课程 | 志愿者伦理道德与行为素养",
    notice: "无",
    show: 479,
    url: "https://www.bilibili.com/video/BV1Kv411e7fy/",
    img: "https://img2.imgtp.com/2024/04/24/9m0ypmLS.png ",
  },
  {
    id: 1,
    name: "居家失能老人家庭照护",
    type: 0,
    mentor: "灬拎壶冲灬",
    address: "线上",
    startTime: "",
    endTime: "",
    mobile: "",
    people: "居家老人",
    desc: "失能老人居家养老照护服务之失能老人（卧床老人）翻身、移位、护理等技能。",
    notice: "无",
    show: 8241,
    url: "https://www.bilibili.com/video/BV1Yt411y7A2",
    img: "https://img2.imgtp.com/2024/04/24/9m0ypmLS.png ",
  },
  {
    id: 2,
    name: "家庭老年人日常照护",
    type: 1,
    mentor: "灬拎壶冲灬",
    address: "线上",
    startTime: "",
    endTime: "",
    mobile: "",
    people: "居家老人",
    desc: "家庭老年人日常照护",
    notice: "无",
    show: 3523,
    url: "https://www.bilibili.com/video/BV17J411p7vd",
    img: "https://img2.imgtp.com/2024/04/24/9m0ypmLS.png ",
  },
  {
    id: 3,
    name: "帮助卧床老人擦浴降温",
    type: 0,
    mentor: "池州孝馨",
    address: "线上",
    startTime: "",
    endTime: "",
    mobile: "",
    people: "卧床老人",
    desc: "帮助卧床老人擦浴降温操作技巧",
    notice: "无",
    show: 1247,
    url: "https://www.bilibili.com/video/BV17D421n7c1/",
    img: "https://img2.imgtp.com/2024/04/24/9m0ypmLS.png ",
  },
  {
    id: 4,
    name: "偏瘫老年人护理",
    type: 0,
    mentor: "灬拎壶冲灬",
    address: "线上",
    startTime: "",
    endTime: "",
    mobile: "",
    people: "偏瘫老人",
    desc: "偏瘫老年人护理—肢体摆放",
    notice: "无",
    show: 2780,
    url: "https://www.bilibili.com/video/BV1eb411G73R/",
    img: "https://img2.imgtp.com/2024/04/24/9m0ypmLS.png ",
  },
];
const Participate = () => {
  const [trainType, setTrainType] = useState(0);
  const [sortType, setSortType] = useState(0);
  const search = () => {
    console.log(trainType, sortType);
  };
  // 查看培训
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(e);
    navigate("/train/traininfo", { state: { train: e } });
  };
  return (
    <>
      <Form
        name="horizontal_login"
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
        onFinish={search}
      >
        <Form.Item label="培训类型">
          <Select
            style={{ width: 120 }}
            onChange={(value) => setTrainType(value)}
            options={[{ value: 0, label: "全部" }, ...activitype]}
          />
        </Form.Item>
        <Form.Item label="其他选择">
          <Select
            style={{ width: 120 }}
            onChange={(value) => setSortType(value)}
            options={[
              { value: 0, label: "全部" },
              { value: 1, label: "最近" },
              { value: 2, label: "最热" },
            ]}
          />
        </Form.Item>
        <Button type="primary">查询</Button>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {trainList.map((item, index) => {
          return <TrainBox train={item} key={index} onClick={handleClick} />;
        })}
      </div>
    </>
  );
};
export default Participate;
