import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import DescLine from "@/components/DescLine";
import ReviewBox from "@/components/ReviewBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Card, Radio, message } from "antd";
import { fetchAuditRealeaseResult } from "@/store/modules/audit";
const LookRelease = () => {
  const location = useLocation();
  const { user } = location.state;
  // 绘图
  const pie = useRef(null);
  const line = useRef(null);
  useEffect(() => {
    const pieChart = echarts.init(pie.current);
    pieChart.setOption({
      color: ["#88D3DB", "#5B7C99", "#93A8AC"],
      title: {
        text: "用户评论比例图",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      series: [
        {
          name: "评论比例",
          type: "pie",
          radius: [0, "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
              color: "#ffffff",
            },
          },
          data: [
            { value: 20, name: "好评" },
            { value: 2, name: "中评" },
            { value: 4, name: "差评" },
          ],
        },
      ],
    });
    const lineChart = echarts.init(line.current);
    lineChart.setOption({
      color: "#88D3DB",
      title: {
        text: "完成交付时间",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },

      xAxis: {
        type: "category",
        data: [
          "活动1",
          "活动2",
          "活动3",
          "活动4",
          "活动5",
          "活动6",
          "活动7",
          "活动8",
          "活动9",
          "活动10",
        ],
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 48,
      },
      series: [
        {
          name: "时间",
          type: "line",
          data: [20, 38, 3, 4, 7, 6, 33, 26, 34, 8],
          emphasis: {
            focus: "series",
          },
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
      ],
    });
  });
  // 提交审核
  const [descrip, setDescrip] = useState("");
  const tags = ["评分过低", "失去信用", "余额不足", "其他原因"];
  const [selectedTags, setSelectedTags] = useState(["评分过低"]);
  const [releaseStatus, setReleaseStatus] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const review = {
      releases: releaseStatus,
      remark: descrip,
      tags: selectedTags,
      mobile: user.mobile,
    };
    await dispatch(fetchAuditRealeaseResult(review))
      .then((res) => {
        message.success("提交成功");
        navigate("/admin/releaseevent", { state: { e: user } });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const back = () => {
    window.history.back();
  };
  return (
    <>
      <div style={{ float: "right" }}>
        <Card>
          <DescLine
            label="审核结果"
            desc={
              <Radio.Group onChange={(e) => setReleaseStatus(e.target.value)}>
                <Radio value={1}>通过</Radio>
                <Radio value={2}>驳回</Radio>
              </Radio.Group>
            }
          />
          {releaseStatus === 2 && (
            <ReviewBox
              setDescrip={setDescrip}
              setSelectedTags={setSelectedTags}
              selectedTags={selectedTags}
              tags={tags}
              style={{ float: "right" }}
            />
          )}
          <div style={{ textAlign: "right", marginTop: 20 }}>
            <Button onClick={onSubmit} type="primary">
              提交
            </Button>
            <Button style={{ marginLeft: 20 }} onClick={() => back()}>
              返回
            </Button>
          </div>
        </Card>
      </div>
      <div style={{ width: "60%" }}>
        <Card>
          <DescLine
            label={
              <label style={{ fontSize: 18, fontWeight: 800 }}>用户姓名</label>
            }
            style={{ marginLeft: 5 }}
            rowspan={[10, 10]}
            desc={<span style={{ fontSize: 18 }}>{user.name}</span>}
          />
          <div ref={pie} style={{ width: 400, height: 270 }}></div>
          <div ref={line} style={{ width: 400, height: 270 }}></div>
        </Card>{" "}
      </div>
    </>
  );
};
export default LookRelease;
