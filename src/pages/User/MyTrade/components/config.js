export const histChart = {
  backgroundColor: "#ffffff",
  color: ["#37A2DA", "#FF9F7F"],
  legend: {
    orient: "vertical",
    x: "90%",
    top: "48%",
    data: ["收入", "支出"],
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    right: "14%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "收入",
      type: "bar",
      stack: "总量",
      barWidth: "70%",
      label: {
        normal: {
          show: true,
          position: "top",
        },
      },
      data: [4, 14, 8, 5, 6, 7, 0],
    },
    {
      name: "支出",
      type: "bar",
      stack: "总量",
      barWidth: "70%",
      label: {
        normal: {
          show: true,
          position: "bottom",
        },
      },
      data: [-9, -15, -22, -10, -12, -14, 0],
    },
  ],
};
let title = "总量";
let color = ["#38cafb", "#4caff9", "#4adeca", "#2aa7ee", "#0270f2", "#488cf7"];
let echartData = [
  {
    name: "公益活动",
    value: 23,
  },
  {
    name: "公益服务",
    value: 12,
  },
  {
    name: "关爱服务",
    value: 20,
  },
  {
    name: "家政服务",
    value: 14,
  },
  {
    name: "上门服务",
    value: 32,
  },
  {
    name: "培训教育",
    value: 20,
  },
];
let formatNumber = function (num) {
  let reg = /(?=(\B)(\d{3})+$)/g;
  return num.toString().replace(reg, ",");
};
let total = echartData.reduce((a, b) => {
  return a + b.value * 1;
}, 0);
export const pieChart = {
  color: color,
  // tooltip: {
  //     trigger: 'item'
  // },
  title: [
    {
      text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
      top: "center",
      left: "center",
      textStyle: {
        rich: {
          name: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#000",
            padding: [10, 0],
          },
          val: {
            fontSize: 16,
            fontWeight: "bolder",
            color: "#111",
          },
        },
      },
    },
    {
      text: "单位：个",
      top: 20,
      left: 20,
      textStyle: {
        fontSize: 14,
        color: "#666666",
        fontWeight: 400,
      },
      show: false,
    },
  ],
  series: [
    {
      type: "pie",
      roseType: "radius",
      radius: ["25%", "60%"],
      center: ["50%", "50%"],
      data: echartData,
      hoverAnimation: false,
      itemStyle: {
        normal: {
          borderColor: "#001037",
          borderWidth: 2,
        },
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 20,
          lineStyle: {
            // color: '#e6e6e6'
          },
        },
      },
      label: {
        normal: {
          formatter: (params) => {
            return (
              "{icon|●}{name|" +
              params.name +
              "}\n{value|" +
              formatNumber(params.value) +
              "}"
            );
          },
          // padding: [0 , -100, 25, -100],
          rich: {
            icon: {
              fontSize: 16,
              color: "inherit",
            },
            name: {
              fontSize: 18,
              padding: [0, 0, 0, 10],
            },
            value: {
              fontSize: 14,
              fontWeight: "bolder",
              padding: [10, 0, 0, 20],
              color: "inherit",
            },
          },
        },
      },
    },
  ],
};
