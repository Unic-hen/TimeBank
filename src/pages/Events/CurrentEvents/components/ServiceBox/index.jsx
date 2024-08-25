import { Tag } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
const ServiceBox = ({ service }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/events/detial`, { state: { serviceid: service.serviceid } });
  };
  return (
    <div className="box" onClick={handleClick}>
      <div className="info">
        <div className="count">
          <div className="coin">
            <p>币量</p>
            <span>{service.timeCoin}个</span>
          </div>
          <div className="nums">
            <p>人数</p>
            <span>{service.serviceNums}人</span>
          </div>
          <div className="current">
            <p>已报</p>
            <span>{service.volunteers.length}人</span>
          </div>
        </div>
        <div className="moreinfo">
          <div className="content">
            <span>活动内容:</span>
            <p>{service.serviceDesc}</p>
          </div>
          <div>
            <span>活动时间:</span>
            <p>
              {service.startTime.slice(0, 10).replaceAll("-", ".")}-
              {service.endTime.slice(0, 10).replaceAll("-", ".")}
            </p>
          </div>
          <div>
            <span>活动地点:</span>
            <p>{service.serviceAddress}</p>
          </div>
          <div>
            <span>报名时间:</span>
            <p>
              {service.entrollTimeStart.slice(0, 10).replaceAll("-", ".")}-
              {service.entrollTimeEnd.slice(0, 10).replaceAll("-", ".")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;
