import { Tag } from "antd";

const ServiceTag = ({ startDate, endDate, auditStatus }) => {
  const date = new Date();
  if (date > new Date(startDate) && date < new Date(endDate)) {
    return <Tag color="#ff0000">进行中</Tag>;
  } else if (date >= new Date(endDate)) {
    return <Tag color="#bfbfbf">已结束</Tag>;
  } else {
    if (!auditStatus) {
      return <Tag color="#f00">审核中</Tag>;
    } else if (auditStatus == 1) {
      return <Tag color="#108ee9">已通过</Tag>;
    } else if (auditStatus == 2) {
      return <Tag color="#bfbfbf">未通过</Tag>;
    }
  }
  return <Tag color="#52c41a">未开始</Tag>;
};
export default ServiceTag;
