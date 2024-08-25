const PanelBox = ({ item }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: 270,
        border: "2px solid #C4C4C4",
        alignItems: "center",
        margin: 10,
      }}
    >
      <div style={{ textAlign: "center", height: 80 }}>
        <p style={{ color: "#87BCFE", marginTop: 10 }}>{item.title}</p>
        <p style={{ color: "#1C7EFE", fontWeight: "bold", fontSize: 24 }}>
          {item.num}
          <span style={{ fontSize: 16 }}>{item.unit}</span>
        </p>
      </div>
      <img src={item.icon} alt="" style={{ width: 60, height: 60 }} />
    </div>
  );
};
export default PanelBox;
