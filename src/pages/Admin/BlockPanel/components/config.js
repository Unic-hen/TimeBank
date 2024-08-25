import * as echarts from "echarts";

export const lineConfig = {
  title: {
    text: `{a|区块链交易趋势}`,
    textStyle: {
      rich: {
        a: {
          fontSize: 16,
          fontWeight: 600,
          color: "#324157",
        },
      },
    },
    top: "8%",
    left: "30%",
  },
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    top: "18%",
    left: "10%",
    right: "5%",
    bottom: "20%",
    // containLabel: true
  },
  xAxis: [
    {
      name: "日期",
      nameTextStyle: {
        color: "#7ec7ff",
        fontSize: 16,
        padding: 10,
      },
      type: "category",
      boundaryGap: false,
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: "#233653",
        },
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        // rotate: 340,
        textStyle: {
          color: "#324157",
          padding: 16,
          fontSize: 14,
        },
        formatter: function (data) {
          return data;
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#eeeeee",
        },
      },
      axisTick: {
        show: false,
      },
      data: ["04-05", "04-10", "04-15", "04-20", "04-25", "04-30"],
    },
  ],
  yAxis: [
    {
      name: "单位：个",
      nameTextStyle: {
        color: "#7ec7ff",
        fontSize: 16,
        padding: 10,
      },
      min: 0,
      splitLine: {
        show: true,
        lineStyle: {
          color: "#eeeeee",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#233653",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#324157",
          padding: 16,
        },
        formatter: function (value) {
          if (value === 0) {
            return value;
          }
          return value;
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "区块",
      type: "line",
      showAllSymbol: true,
      symbolSize: 10,
      smooth: true,
      lineStyle: {
        normal: {
          width: 4,
          color: "rgba(29,130,254,1)", // 线条颜色
        },
        borderColor: "rgba(0,0,0,.4)",
      },
      itemStyle: {
        color: "rgba(29,130,254,1)",
        borderColor: "#646ace",
        borderWidth: 2,
      },
      label: {
        normal: {
          show: true,
          position: "top",
          formatter: "{c}个",
        },
      },
      tooltip: {
        show: true,
      },
      areaStyle: {
        //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(29,130,254,.3)",
              },
              {
                offset: 1,
                color: "rgba(29,130,254, 0)",
              },
            ],
            false
          ),
          shadowColor: "rgba(29,130,254, 0.5)", //阴影颜色
          shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        },
      },
      data: [3, 2, 4, 5, 3, 6],
    },
  ],
};
export const pieConifig = {
  color: ["#88D3DB", "#5B7C99", "#3cd6df", "#9bbede", "#82dffe"],
  title: {
    text: "区块分布图",
    // left: "",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  series: [
    {
      name: "区块分布",
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
        { value: 13, name: "成都" },
        { value: 5, name: "重庆" },
        { value: 8, name: "西安" },
        { value: 10, name: "南充" },
        { value: 12, name: "北京" },
      ],
    },
  ],
};
