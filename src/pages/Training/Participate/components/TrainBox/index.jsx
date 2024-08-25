import DescLine from "@/components/DescLine";
import "./index.scss";
const trainMap = {
  type: "培训类型",
  mentor: "培训导师",
  address: "培训地点",
};
const TrainBox = ({ train, onClick }) => {
  return (
    <div
      style={{ width: 240, height: 250, margin: 20 }}
      onClick={() => onClick(train)}
      className="train-box"
    >
      <div style={{ width: 240, height: 150, border: "1px solid #aaa" }}>
        <img
          src={train.img}
          alt={train.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ color: "#666", fontSize: 12, padding: 10 }}>
        <p style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
          {train.name}
        </p>

        <DescLine
          label={trainMap.mentor}
          desc={train.mentor}
          rowspan={[5, 14]}
          style={{ margin: "5px 0" }}
        />
        <DescLine
          label={trainMap.address}
          desc={train.address}
          rowspan={[5, 5]}
          style={{ margin: "5px 0" }}
        />
      </div>
    </div>
  );
};
export default TrainBox;
