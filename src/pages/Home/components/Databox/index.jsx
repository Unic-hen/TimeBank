const DataBox = ({ number, desc }) => {
  return (
    <div style={{ width: "40%" }}>
      <h1 title={number} style={{ color: "#2977B9", textAlign: "center" }}>
        {number}
      </h1>
      <p title={desc}>{desc}</p>
    </div>
  );
};
export default DataBox;
