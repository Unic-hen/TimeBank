import { Tag } from "antd";

const ServiceTag = ({ item }) => {
  const date = new Date();
  if (
    new Date(item.entrollTimeEnd) >= date &&
    new Date(item.startTime) > date
  ) {
    return <Tag color="#ff0000">报名中</Tag>;
  } else if (date > new Date(item.endTime)) {
    return <Tag color="#bfbfbf">已结束</Tag>;
  } else if (
    new Date(item.startTime) <= date &&
    new Date(item.endTime) >= date
  ) {
    return <Tag color="#52c41a">活动中</Tag>;
  }
};
export default ServiceTag;
