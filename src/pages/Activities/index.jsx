import DescLine from "@/components/DescLine";
import { DatePicker, Card, Tag, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServiceTag from "./components/ServiceTag";
import ServiceBox from "./components/ServiceBox";
import { useLocation, useNavigate } from "react-router-dom";
import activitype from "@/utils/activitype";
import { fetchServices } from "@/store/modules/service";
import "./index.scss";
import loading from "@/assets/images/loading.png";
const { RangePicker } = DatePicker;
const { Meta } = Card;
// default
const types = [
  "全部",
  ...activitype.map((item) => {
    return item.label;
  }),
];
const ids = [
  14449566, 14449565, 14449571, 14449570, 14449572, 14449574, 14449575,
  14449576,
];
const coins = ["全部", "1~10", "11~20", "21~30", "31~40", "41~50", "50以上"];
const people = ["全部", "1", "2~10", "10~20", "20~30", "30以上"];
const status = ["全部", "报名中", "活动中", "已结束"];
const Activities = () => {
  // states
  const [selectedTypes, setSelectedTypes] = useState(["全部"]); // types
  const [selectedCoin, setSelectedCoin] = useState(["全部"]); //   timecoins
  const [selectedPeople, setSelectedPeople] = useState(["全部"]); //   people nums
  const [selectedStatus, setSelectedStatus] = useState(["全部"]); // status
  // 获取数据
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices({ page: 1, pageSize: 100 }));
    // 直接刷新
  }, [dispatch]);
  const services = useSelector((state) => state.service.servicesList);
  const user = useSelector((state) => state.user.userInfo);
  const head = (data) => {
    const code = activitype.map((item) => {
      return item.value;
    })[ids.indexOf(user.id) + 0];
    return [
      ...data.filter((item) => item.serviceType == parseInt(code)),
      ...data.filter((item) => item.serviceType != parseInt(code)),
    ];
  };
  const [data, setData] = useState(head(services));

  // funcs
  // 搜索
  const location = useLocation();
  const { state } = location;
  if (state) {
    setData(state);
    location.state = null;
  }

  // 查看活动
  const navigate = useNavigate();
  const handleClick = (service) => {
    navigate(`/events/detial`, { state: { id: service.id } });
  };
  // 筛选函数：
  const timeFilter = (e) => {
    setData(
      services.filter((item) => {
        return (
          new Date(item.startTime) >= e[0] && new Date(item.endTime) <= e[1]
        );
      })
    );
  };
  const typeFilter = (tag) => {
    if (tag !== "全部") {
      const tmp = activitype.filter((item) => item.label == tag)[0];
      const tmp2 = services.filter((itm) => itm.serviceType == tmp.value);
      setData(tmp2);
    }
    if (tag === "全部") {
      setData(services);
    }
    setSelectedTypes([tag]);
  };

  // 提取数字
  const regex = (str) => {
    return str.match(/\d+/g);
  };

  const coinFilter = (tag) => {
    if (tag !== "全部") {
      const [minCoin, maxCoin] = regex(tag);
      setData(
        services.filter(
          (item) => item.timeCoin >= minCoin && item.timeCoin <= maxCoin
        )
      );
    } else {
      setData(services);
    }
    setSelectedCoin([tag]);
  };

  const numsFilter = (tag) => {
    if (tag !== "全部") {
      const [minNum, maxNum] = regex(tag);
      setData(
        services.filter(
          (item) => item.serviceNums >= minNum && item.serviceNums <= maxNum
        )
      );
    } else {
      setData(services);
    }
    setSelectedPeople([tag]);
  };

  const statusFilter = (tag) => {
    if (tag === "报名中") {
      setData(
        services.filter(
          (item) =>
            new Date(item.entrollTimeEnd) >= new Date() &&
            new Date() < new Date(item.startTime)
        )
      );
    } else if (tag === "活动中") {
      setData(
        services.filter(
          (item) =>
            new Date(item.startTime) <= new Date() &&
            new Date(item.endTime) >= new Date()
        )
      );
    } else if (tag === "已结束") {
      setData(services.filter((item) => new Date(item.endTime) < new Date()));
    }
    if (tag === "全部") {
      setData(services);
    }
    setSelectedStatus([tag]);
  };
  // 图片懒加载
  const io = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
      // 当前元素可见时
      if (item.isIntersecting) {
        item.target.src = item.target.dataset.src; // 替换 src
        io.unobserve(item.target); // 停止观察当前元素，避免不可见时再次调用 callback 函数
      }
    });
  });

  const imgs = document.querySelectorAll("[data-src]");

  // 监听所有图片元素
  imgs.forEach((item) => {
    io.observe(item);
  });
  return (
    <div>
      <Card>
        <DescLine
          label={<h3>活动时间</h3>}
          desc={
            <RangePicker
              onChange={(e) => timeFilter(e.map((item) => new Date(item)))}
            />
          }
          rowspan={[8, 40]}
        />
        <DescLine
          label={<h3>活动类型</h3>}
          desc={types.map((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={selectedTypes.includes(tag)}
              onChange={() => typeFilter(tag)}
            >
              <h3 style={{ fontWeight: 400 }}>{tag}</h3>
            </Tag.CheckableTag>
          ))}
          rowspan={[8, 80]}
        />
        <DescLine
          label={<h3>时间币量</h3>}
          desc={coins.map((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={selectedCoin.includes(tag)}
              onChange={() => coinFilter(tag)}
            >
              <h3 style={{ fontWeight: 400 }}>{tag}</h3>
            </Tag.CheckableTag>
          ))}
          rowspan={[8, 80]}
        />
        <DescLine
          label={<h3>活动人数</h3>}
          desc={people.map((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={selectedPeople.includes(tag)}
              onChange={() => numsFilter(tag)}
            >
              <h3 style={{ fontWeight: 400 }}>{tag}</h3>
            </Tag.CheckableTag>
          ))}
          rowspan={[8, 80]}
        />
        <DescLine
          label={<h3>项目状态</h3>}
          desc={status.map((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={selectedStatus.includes(tag)}
              onChange={() => statusFilter(tag)}
            >
              <h3 style={{ fontWeight: 400 }}>{tag}</h3>
            </Tag.CheckableTag>
          ))}
          rowspan={[8, 80]}
        />
      </Card>
      <Card>
        {data.length ? (
          <>
            <div className="currentevents">
              {data.map((service, index) => (
                <Card
                  key={index}
                  hoverable
                  style={{
                    width: 280,
                    margin: 40,
                  }}
                  cover={
                    <>
                      <div className="tag">
                        <ServiceTag item={service} />
                      </div>
                      <img
                        data-src={service.serviceImg}
                        src={loading}
                        className="img"
                        style={{
                          border: "1px solid #c0f0c0",
                          objectFit: "cover",
                        }}
                      />
                    </>
                  }
                  onClick={() => handleClick(service)}
                >
                  <Meta
                    title={
                      <div className="activite-title">
                        【
                        {
                          activitype.filter(
                            (item) => item.value == service.serviceType
                          )[0].label
                        }
                        】{service.serviceName}
                      </div>
                    }
                    description={<ServiceBox service={service} />}
                  />
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div style={{ margin: "20px" }}>
            <Empty />
          </div>
        )}
      </Card>
    </div>
  );
};
export default Activities;
