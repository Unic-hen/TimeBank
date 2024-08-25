import { useState } from "react";
import { useLocation } from "react-router-dom";
import { message, Button } from "antd";
import "./index.scss";
const TrainInfo = () => {
  const location = useLocation();
  const { train } = location.state;
  //   报名
  const [signStatus, setSignStatus] = useState(false);
  const handleClick = () => {
    message.info("报名成功，请前往“参与培训/我的培训”中查看");
    setSignStatus(true);
  };
  return (
    <div className="train-info">
      <header>
        <div className="img">
          <img
            src={train.img}
            alt={train.name}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="info">
          <div className="train-name">{train.name}</div>
          <div>
            <p>培训编号：</p>
            <span>{train.id}</span>
          </div>
          <div>
            <p>活动类型：</p>
            <span>{train.type ? "必修" : "选修"}</span>
          </div>
        </div>
      </header>
      <div className="control">
        <div>
          <p>
            <span>
              已有<span style={{ color: "#777" }}>{train.show}</span>人参与
            </span>
          </p>
        </div>
        <div className="button">
          <a href={train.url} target="_blank">
            <Button>立即学习</Button>
          </a>
        </div>
      </div>
      <div className="train-desc">
        <p>
          <span>培训地点：</span>
          <span>{train.address}</span>
        </p>
        <p>
          <span>活动时间：</span>
          {train.startTime ? (
            <span>
              {train.startTime.slice(0, 10).replaceAll("-", ".")}-
              {train.endTime.slice(0, 10).replaceAll("-", ".")}
            </span>
          ) : (
            <sapn>--</sapn>
          )}
        </p>
        <p>
          <span>培训时间：</span>
          {train.startTime ? <span>{train.startTime}</span> : <sapn>--</sapn>}
        </p>
        <p>
          <span>联系方式：</span>
          {train.mobile ? <sapn>{train.mobile}</sapn> : <span>--</span>}
        </p>
        <p>
          <span>培训对象：</span>
          <span>{train.people}</span>
        </p>
        <p>
          <span>培训简介：</span>
          <span>{train.desc}</span>
        </p>
        <p>
          <span>培训须知：</span>
          <span>{train.notice}</span>
        </p>
      </div>
    </div>
  );
};
export default TrainInfo;
