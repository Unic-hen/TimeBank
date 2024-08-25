import { Card, Progress, Layout } from "antd";
import sj from "@/assets/images/panel/数据.svg";
import yh from "@/assets/images/panel/患者管理.svg";
import tj from "@/assets/images/panel/数据管理.svg";
import gl from "@/assets/images/panel/代办事项.svg";
import hdsh from "@/assets/images/panel/登记.svg";
import fbsh from "@/assets/images/panel/授权申请.svg";
import zgsh from "@/assets/images/panel/资质.svg";
import PanelBox from "./components/PanelBox";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { line2, line1, hist } from "./components/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditUsersList } from "@/store/modules/audit";
import { fetchServices } from "@/store/modules/service";
const { Footer } = Layout;

const Panel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuditUsersList());
    dispatch(fetchServices({ page: 1, pageSize: 100 }));
  }, [dispatch]);
  //
  const users = useSelector((state) => state.audit.auditUsersList);
  const services = useSelector((state) => state.service.servicesList);
  // 首航信息
  const items1 = [
    {
      title: "占用空间",
      icon: sj,
      num: 4.22,
      unit: "MB",
    },
    {
      title: "用户总数",
      icon: yh,
      num: users.length,
      unit: "人",
    },
  ];
  const items2 = [
    {
      title: "登录统计",
      icon: tj,
      num: 138,
      unit: "次",
    },
    {
      title: "活动总数",
      icon: gl,
      num: services.length,
      unit: "个",
    },
  ];
  // 审核信息
  const audit = [
    {
      title: "活动审核",
      icon: hdsh,
      num: services.filter((item) => item.auditStatus === 0).length,
    },
    {
      title: "发布审核",
      icon: fbsh,
      num: users.filter((item) => item.releases === 0).length + 2,
    },
    {
      title: "资格审核",
      icon: zgsh,
      num: users.filter((item) => item.sign === 0).length + 1,
    },
  ];
  const near = useRef(null);
  const user = useRef(null);
  const area = useRef(null);
  useEffect(() => {
    const near7Days = echarts.init(near.current);
    near7Days.setOption(line1);
    const userReg = echarts.init(user.current);
    userReg.setOption(line2);
    const distribute = echarts.init(area.current);
    distribute.setOption(hist);
  }, []);
  return (
    <>
      <Card>
        <h2>看板</h2>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              border: "2px solid #C4C4C4",
              width: 360,
              height: 260,
              margin: 10,
              padding: 10,
            }}
          >
            {audit.map((item, index) => (
              <div key={index} style={{ margin: "3px 0" }}>
                <div style={{ display: "flex", justifyContent: "left" }}>
                  <img
                    src={item.icon}
                    alt=""
                    style={{ width: 45, height: 45 }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#87BCFE",
                      }}
                    >
                      {item.num}
                    </p>
                    <p style={{ color: "#777" }}>{item.title}</p>
                  </div>
                </div>
                <Progress percent={item.num * 10} showInfo={false} />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: 310,
            }}
          >
            {items1.map((item, index) => (
              <PanelBox item={item} key={index} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: 310,
            }}
          >
            {items2.map((item, index) => (
              <PanelBox item={item} key={index} />
            ))}
          </div>
        </section>
        <main style={{ display: "flex", justifyContent: "space-between" }}>
          <section style={{ margin: 10 }}>
            <div ref={area} style={{ width: 640, height: 540 }}></div>
          </section>
          <section style={{ margin: 10 }}>
            <div ref={near} style={{ width: 360, height: 270 }}></div>
            <div ref={user} style={{ minWidth: 360, height: 270 }}></div>
          </section>
        </main>
      </Card>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        版本信息 ©帆长时间银行 V0.0.1
      </Footer>
    </>
  );
};
export default Panel;
