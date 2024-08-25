import { Popover } from "antd";
import "./index.scss";
const ServiceBox = ({ service }) => {
  const subDress = (str) => {
    const add = str.split("-");
    return [add[add.length - 1], str];
  };
  return (
    <div className="box">
      <div className="info">
        <div className="count">
          <div className="coin lline">
            <p>币量</p>
            <span>{service.timeCoin}个</span>
          </div>
          <span>|</span>
          <div className="nums lline">
            <p>人数</p>
            <span>{service.serviceNums}人</span>
          </div>
          <span>|</span>
          <div className="current lline">
            <p>已报</p>
            <span>{service.volunteer.length}人</span>
          </div>
        </div>
        <div className="moreinfo">
          <div className="content">
            <span>活动内容:</span>
            <p style={{ textIndent: "2em" }}>{service.serviceDesc}</p>
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
            <Popover content={<p>{subDress(service.serviceAddress)[1]}</p>}>
              <a>{subDress(service.serviceAddress)[0]}</a>
            </Popover>
          </div>
          {/* <div>
            <span>报名时间:</span>
            <p>
              {service.entrollTimeStart.slice(0, 10).replaceAll("-", ".")}-
              {service.entrollTimeEnd.slice(0, 10).replaceAll("-", ".")}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;
