import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { Button, message, Modal, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { volunteerSignUp } from "@/store/modules/service";
import activitype from "@/utils/activitype";
import { fetchServices } from "@/store/modules/service";
import { useEffect, useState } from "react";
const Detial = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  // states
  const { state } = location;
  const services = useSelector((state) => state.service.servicesList);
  console.log(services, "services");

  const service = services.find((item) => item.id === state.id);
  const [servic, setServic] = useState(service);
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [signStatus, setSignStatus] = useState(false);

  useEffect(() => {
    if (service.volunteer.find((item) => item.idCard === user.idCard)) {
      setSignStatus(true);
    } else {
      setSignStatus(false);
    }
  }, []);
  console.log(service);
  // funcs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = async () => {
    // if (user.name == "刘七") {
    //   setIsModalOpen(true);
    //   return;
    // }
    console.log(servic, "servic");
    setServic({
      ...servic,
      volunteer: [
        {
          idCard: user.idCard,
          name: user.name,
          phone: user.phone,
          id: service.id,
        },
      ],
    });
    console.log(
      {
        id: service.id,
      },
      "signup"
    );
    // 志愿者报名
    await dispatch(
      volunteerSignUp({
        id: service.id,
      })
    ).then(() => {
      message.success("报名成功");
      setSignStatus(true);
      dispatch(fetchServices());
    });
  };
  console.log(servic.volunteer.length);
  return (
    <div className="detial">
      <div
        className="header"
        style={{ display: "flex", justifyContent: "left" }}
      >
        <img src={servic.serviceImg} alt="" style={{ objectFit: "cover" }} />
        <div className="info">
          <div className="name">{servic.serviceName}</div>
          <div>
            <p>活动编号：</p>
            <span>{servic.id}</span>
          </div>
          <div>
            <p>活动类型：</p>
            <span>
              {
                activitype.filter(
                  (item) => parseInt(item.value) === servic.serviceType
                )[0].label
              }
            </span>
          </div>
        </div>
      </div>
      <div className="control">
        <div>
          <p>
            报名:
            <span>{servic.serviceNums}</span>人
          </p>
          <p>
            已报:
            <span>{servic.volunteer.length}</span>人
          </p>
        </div>
        <Modal
          title="提示"
          open={isModalOpen}
          onOk={() => navigate("/train/participate")}
          onCancel={() => setIsModalOpen(false)}
          cancelText="再看看"
          okText="这就去"
        >
          <p>尊敬的新用户，您还不能报名哦，请学习相关课程！</p>
        </Modal>
        <div className="button">
          {signStatus ? (
            <Button
              onClick={() =>
                message.info("您已报名,您可以在“个人中心/我的志愿”中查看")
              }
            >
              已报名
            </Button>
          ) : (
            <Button onClick={() => handleClick()}>立即报名</Button>
          )}
        </div>
      </div>
      <div className="baseinfo">
        <div className="symbol">活动基本时间</div>
        <div className="content">
          <div>
            <p>
              活动地点：<span>{service.serviceAddress}</span>
            </p>
            <p>
              报名日期：
              <span>
                {service.entrollTimeStart.slice(0, 10).replaceAll("-", ".")}-
                {service.entrollTimeEnd.slice(0, 10).replaceAll("-", ".")}
              </span>
            </p>
            <p>
              活动日期：
              <span>
                {service.startTime.slice(0, 10).replaceAll("-", ".")}-
                {service.endTime.slice(0, 10).replaceAll("-", ".")}
              </span>
            </p>
            <p>
              负责人员：
              <Popover placement="right" content={<p>联系方式：13800138000</p>}>
                <a>张三</a>
              </Popover>
            </p>
          </div>
          <div>
            <p>
              时间币：<span>{service.timeCoin}个</span>
            </p>
            <p>
              服务对象：<span>{service.older}</span>
            </p>
            <p>
              联系方式：<span>{service.servicePhone}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="otherinfo">
        <div className="symbol">活动基本信息</div>
        <div className="desc">
          <div>
            <span>活动内容:</span>
            <p>{service.serviceDesc}</p>
          </div>
          <div>
            <span>活动须知:</span>
            <p>{service.notice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detial;
