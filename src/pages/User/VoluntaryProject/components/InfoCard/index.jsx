import {
  IdcardFilled,
  PayCircleFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ data, onClick }) => {
  const navigate = useNavigate();
  return (
    <div>
      <span
        style={{
          position: "relative",
          top: 10,
          float: "right",
          height: 50,
        }}
      >
        {data.entrollTimeStart.slice(0, 10).replaceAll("-", ".")}-
        {data.entrollTimeEnd.slice(0, 10).replaceAll("-", ".")}
      </span>
      <div
        style={{ display: "flex", justifyContent: "left" }}
        onClick={onClick}
      >
        <div style={{ width: 300, height: 150 }}>
          <img
            src={data.serviceImg}
            alt={data.serviceName}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            margin: "5px 30px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ textAlign: "left", fontSize: 20 }}>
            {data.serviceName}
          </h1>
          <p style={{ margin: "20px 0" }}>{data.serviceDesc}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span style={{ marginLeft: "10px" }}>
              <IdcardFilled style={{ color: "#919191" }} />
              <span>{data.older}</span>
            </span>
            <span>
              <ClockCircleFilled style={{ color: "#919191" }} />
              <span style={{ marginLeft: "10px" }}>
                {data.startTime.slice(0, 10).replaceAll("-", ".")}
              </span>
            </span>
            <span style={{ marginLeft: "10px" }}>
              <PayCircleFilled style={{ color: "#919191" }} />
              <span>{data.timeCoin}</span>
            </span>
          </div>
        </div>
      </div>
      <hr color="#eee" />
    </div>
  );
};
export default InfoCard;
