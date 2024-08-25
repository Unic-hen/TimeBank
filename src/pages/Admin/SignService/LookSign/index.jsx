import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import DescLine from "@/components/DescLine";
import ReviewBox from "@/components/ReviewBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Card, Radio, message } from "antd";
import { fetchAuditSignResult } from "@/store/modules/audit";
const LookSign = () => {
  const location = useLocation();
  const { user } = location.state;
  // charts
  const pie = useRef(null);
  const cbar = useRef(null);
  const wbar = useRef(null);
  useEffect(() => {
    // pie
    const pieChart = echarts.init(pie.current);

    pieChart.setOption({
      color: ["#88D3DB", "#5B7C99", "#93A8AC"],
      title: {
        text: "用户评论比例图",
        // left: "",
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
    // course bar
    const courseBar = echarts.init(cbar.current);
    courseBar.setOption({
      color: "#0D98BA",
      title: {
        text: "课程完成情况",
      },
      legend: {},
      xAxis: {
        name: "课程种类",
        type: "category",
        nameTextStyle: {
          fontWeight: "700",
        },
        data: ["课程1", "课程2", "课程3", "课程4"],
        nameLocation: "center",
      },
      yAxis: {
        name: "完成百分百",
        type: "value",
        nameLocation: "center",
        nameTextStyle: {
          fontWeight: "700",
        },
        nameGap: "28",
      },
      series: [
        {
          type: "bar",
          data: [85, 95, 98, 97],
        },
      ],
    });
    const wenjuanBar = echarts.init(wbar.current);
    wenjuanBar.setOption({
      color: "#88D3DB",
      title: {
        text: "问卷得分",
      },
      legend: {},
      xAxis: {
        name: "课程种类",
        type: "category",
        nameTextStyle: {
          fontWeight: "700",
        },
        nameLocation: "center",

        data: ["奉献精神", "身体素质", "语言表达", "学习能力"],
      },
      yAxis: {
        name: "各模块得分",
        type: "value",
        nameLocation: "center",
        nameTextStyle: {
          fontWeight: "700",
        },
        nameGap: "28",
      },
      series: [
        {
          type: "bar",
          data: [85, 95, 98, 97],
        },
      ],
    });
  }, []);

  //
  const [descrip, setDescrip] = useState("");
  const tags = ["评分过低", "课程未休", "身体虚弱", "其他原因"];
  const [selectedTags, setSelectedTags] = useState(["评分过低"]);
  const [signStatus, setSignStatus] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async () => {
    const review = {
      mobile: user.mobile,
      remark: descrip,
      tags: selectedTags,
      sign: signStatus,
    };
    console.log(review);
    await dispatch(fetchAuditSignResult(review))
      .then(() => {
        message.success("提交成功");
        navigate("/admin/signservice", { state: { e: user } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div style={{ float: "right" }}>
        <Card>
          <DescLine
            label="审核结果"
            desc={
              <Radio.Group onChange={(e) => setSignStatus(e.target.value)}>
                <Radio value={1}>通过</Radio>
                <Radio value={2}>驳回</Radio>
              </Radio.Group>
            }
          />
          {signStatus === 2 && (
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
            <Button
              style={{ marginLeft: 20 }}
              onClick={() => {
                window.history.back();
              }}
            >
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
          <div ref={pie} style={{ width: 420, height: 270 }}></div>
          <div ref={cbar} style={{ width: 480, height: 270 }}></div>
          <div ref={wbar} style={{ width: 480, height: 270 }}></div>
        </Card>
      </div>
    </>
  );
};
export default LookSign;
