import { useLocation, useNavigate } from "react-router-dom";
import DescLine from "@/components/DescLine";
import DescBox from "./components/DescBox";
import { Radio, Tag, Input, Button, Card, message } from "antd";
import { useState } from "react";
// import fetchServiceResult from "@/store/modules/audit";
import { useDispatch, useSelector } from "react-redux";
import { getType } from "@/utils/activitype";
// 结构antd中的组件
const { TextArea } = Input;
const { CheckableTag } = Tag;
// 静态数据
const data = {
  serviceid: 3,
  serviceName: "上门洗衣上门洗衣上门洗衣上门洗衣上门洗衣",
  timeCoin: 100,
  serviceType: "laundry",
  startTime: "2021-01-01 10:00:00",
  endTime: "2021-01-01 20:00:00",
  serviceStatus: 1,
  serviceAudit: 0,
  serviceAddress: "北京市朝阳区",
  older: "老李",
  serviceImg: "url",
  servicePhone: "13800138000",
  entrollTimeStart: "2021-01-01 10:00:00",
  entrollTimeEnd: "2021-01-03 10:00:00",
  serviceNums: 10,
  serviceDesc:
    "上门洗衣上门洗衣上门洗衣上门洗衣上门洗衣上门洗衣上门洗衣上门洗衣",
  notice: "带上洗衣液",
};
// main
const Info = () => {
  const location = useLocation();
  // 审核是否通过
  const [pass, setPass] = useState(false);
  // 审核内容
  const data = location.state;
  console.log(data, "data");
  const track = location.state.track;
  console.log(track);
  // 修改数据展示
  const newdata = {
    serviceTime: data.startTime + "-" + data.endTime,
    entrollTime: data.entrollTimeStart + "-" + data.entrollTimeEnd,
    ...data,
  };
  const user = useSelector((stae) => stae.user.userInfo);
  // 标签选择
  const tags = ["信息缺失", "时间币数", "内容违规", "其他原因"];
  const [selectedTags, setSelectedTags] = useState(["信息缺失"]);
  const [descrip, setDescrip] = useState("");
  const handleClick = ({ target }) => {
    setPass(target.value);
  };
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log(nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  // 提交审核
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async () => {
    // const result = {
    //   // ...data,
    //   auditReason: selectedTags.join(","),
    //   auditRemark: descrip,
    //   auditStatus: pass,
    //   adminMobile: user.mobile,
    //   auditId: data.auditId,
    // };
    // console.log(result, "data");
    message.success("提交成功");

    navigate("/admin/eventaudit", { state: { e: data } });
    // await dispatch(fetchServiceResult(result))
    //   .then((res) => {
    //     message.success("提交成功");
    //     navigate("/admin/eventaudit");
    //   })
    //   .catch((err) => {
    //     message.error("提交失败" + err);
    //   });
  };

  const comment = [
    {
      label: "是否通过",
      key: 1,
      desc: (
        <>
          <Radio.Group onChange={handleClick} value={pass}>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </>
      ),
    },
    {
      label: "驳回原因",
      key: 2,
      desc: (
        <>
          {tags.map((tag) => {
            return (
              <CheckableTag
                key={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            );
          })}
        </>
      ),
    },
    {
      label: "详细说明",
      block: true,
      key: 3,
      desc: (
        <TextArea
          rows={6}
          placeholder="如不通过，请详细描述原因"
          onChange={(e) => setDescrip(e.target.innerText)}
        />
      ),
    },
  ];
  console.log(getType(data.serviceType), "getType");
  return (
    <Card>
      <div className="admin-info">
        <div style={{ display: "flex", width: "70%" }}>
          <div style={{ height: 270, width: 450 }}>
            <img
              src={data.serviceImg}
              alt="avatar"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ margin: "10px 40px" }}>
            <h1
              style={{
                textAlign: "left",
              }}
            >
              {data.serviceName}
            </h1>
            <DescLine
              rowspan={[10, 10]}
              label={<span>活动编号</span>}
              desc={data.serviceid}
              size={18}
              style={{ margin: "30px 0" }}
            />
            <DescLine
              label={<span>活动类型</span>}
              desc={getType(data.serviceType)}
              size={18}
              style={{ margin: "30px 0" }}
              rowspan={[8, 10]}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div className="admin-more">
            <DescBox
              items={newdata}
              addons={
                <>
                  <DescLine label="活动详情" desc={newdata.serviceDesc} block />
                  <DescLine label="注意事项" desc={newdata.notice} block />
                </>
              }
            />
          </div>
          {!track && (
            <div
              style={{
                width: "56%",
                padding: 10,
                borderLeft: "2px dotted #2e54a1",
              }}
            >
              <h3 style={{ color: "#2e54a1" }}>意见栏</h3>
              {comment.map((item) => {
                return <DescLine {...item} />;
              })}
              <div
                style={{
                  marginTop: 40,
                  width: "60%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button type="primary" onClick={submit}>
                  确定
                </Button>
                <Button>取消</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
export default Info;
