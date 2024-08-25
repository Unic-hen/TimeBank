import * as echarts from "echarts";
import { useEffect, useRef } from "react";
const pieChart = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const pieChart = echarts.init(chatRef.current);
    const option = {
      color: ["#95ec69", "#fede5c", "#f39797"],
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
    };
    pieChart.setOption(option);
  }, []);
  return (
    <>
      <div ref={chartRef} style={{ width: 360, height: 270 }}></div>
    </>
  );
};
