import logo from "@/assets/images/user/logo.png";
const Logo = () => {
  return (
    <div style={{ display: "flex", margin: 15 }}>
      <img
        src={logo}
        alt="帆长时间银行"
        style={{ width: 60, height: 60, margin: 10 }}
      />
      <div>
        <p style={{ fontSize: 30, color: "#155682", fontWeight: "bold" }}>
          帆长时间银行
        </p>
        <p style={{ fontSize: 24, color: "#0A4E7C" }}>时间交易平台</p>
      </div>
    </div>
  );
};
export default Logo;
