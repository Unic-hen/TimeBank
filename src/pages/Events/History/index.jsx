import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import InfoCard from "./components/InfoCard";
import { fetchDemander } from "@/store/modules/service";
import { useEffect } from "react";
const History = () => {
  // 获取需求者有关的数据
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  console.log();
  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(
        fetchDemander({
          page: 1,
          pageSize: 10,
        })
      );
    }
  }, [dispatch]);
  const stmp = useSelector((state) => state.service.demanderHistory);
  const now = new Date();
  let services = stmp.filter((item) => new Date(item.endTime) < now) || [];
  // 搜索
  const location = useLocation();
  const { state } = location;
  if (state) {
    services = state;
    location.state = null;
  }
  // 所有活动
  const handleClick = async (service) => {
    navigate("/events/demand", { state: { service } });
  };
  return (
    <>
      {services.length ? (
        <>
          {services.map((item) => {
            return (
              <InfoCard
                data={item}
                key={item.id}
                onClick={() => handleClick(item)}
              />
            );
          })}
        </>
      ) : (
        <div style={{ margin: "20px" }}>
          <Empty />
        </div>
      )}
    </>
  );
};
export default History;
