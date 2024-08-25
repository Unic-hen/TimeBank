import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import InfoCard from "./components/InfoCard";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchVolunteer } from "@/store/modules/service";
import { Empty } from "antd";
const VoluntaryProject = () => {
  const user = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (service) => {
    navigate("/user/wish", { state: { service } });
  };
  useEffect(() => {
    if (Object.keys(user).length) {
      dispatch(
        fetchVolunteer({
          page: 1,
          pageSize: 10,
        })
      );
    }
  }, [dispatch]);
  let services = useSelector((state) => state.service.volunteerHistory) || [];

  // 搜索
  const location = useLocation();
  const { state } = location;
  if (state) {
    services = state;
    location.state = null;
  }
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

export default VoluntaryProject;
