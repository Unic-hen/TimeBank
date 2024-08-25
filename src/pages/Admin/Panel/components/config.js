import * as echarts from "echarts";
// import "../../../../../node_modules/echarts/map/js/china";
export const line1 = {
  title: {
    text: `{a|近7天活动管理数}`,
    textStyle: {
      rich: {
        a: {
          color: "#324157",
          fontSize: 16,
          fontWeight: 600,
        },
      },
    },
    top: "5%",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0, 255, 233,0)",
            },
            {
              offset: 0.5,
              color: "rgba(255, 255, 255,1)",
            },
            {
              offset: 1,
              color: "rgba(0, 255, 233,0)",
            },
          ],
          global: false,
        },
      },
    },
  },
  grid: {
    top: "15%",
    left: "5%",
    right: "5%",
    bottom: "15%",
    // containLabel: true
  },
  xAxis: [
    {
      type: "category",
      axisLine: {
        show: true,
      },
      splitArea: {
        // show: true,
        color: "#2c3039",
        lineStyle: {
          color: "#f00",
        },
      },
      axisLabel: {
        color: "#2c3039",
      },
      splitLine: {
        show: false,
      },
      boundaryGap: false,
      data: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期天",
      ],
    },
  ],

  yAxis: [
    {
      type: "value",
      min: 0,
      // max: 140,
      splitNumber: 4,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        margin: 20,
        textStyle: {
          color: "#d1e6eb",
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "活动总量",
      type: "line",
      // smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: "circle",
      symbolSize: 25,
      lineStyle: {
        normal: {
          color: "#1d82fe",
          shadowColor: "rgba(0, 0, 0, .3)",
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5,
        },
      },
      label: {
        show: true,
        position: "top",
        textStyle: {
          color: "#1d82fe",
        },
      },
      itemStyle: {
        color: "#1d82fe",
        borderColor: "#fff",
        borderWidth: 3,
        shadowColor: "rgba(0, 0, 0, .3)",
        shadowBlur: 0,
        shadowOffsetY: 2,
        shadowOffsetX: 2,
      },
      tooltip: {
        show: false,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(29,130,254,0.3)",
              },
              {
                offset: 1,
                color: "rgba(29,130,254,0)",
              },
            ],
            false
          ),
          shadowColor: "rgba(29,130,254, 0.9)",
          shadowBlur: 20,
        },
      },
      data: [5, 3, 8, 7, 6, 9, 8],
    },
  ],
};

export const line2 = {
  title: {
    text: `{a|本月用户注册数目}`,
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
      name: "人数",
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

export const hist = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  legend: {
    data: ["交易数目"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      axisLabel: {
        interval: 0,
        rotate: -50,
      },
      data: [
        "上海",
        "云南",
        "内蒙",
        "北京",
        "吉林",
        "四川",
        "天津",
        "宁夏",
        "安徽",
        "山东",
        "山西",
        "广东",
        "广西",
        "新疆",
        "江西",
        "河北",
        "河南",
        "浙江",
        "海南",
        "湖北",
        "湖南",
        "甘肃",
        "福建",
        "西藏",
        "贵州",
        "辽宁",
        "重庆",
        "陕西",
        "青海",
        "黑龙江",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      max: 10,
      // axisTick: {
      //     show: false
      // },
    },
  ],
  series: [
    {
      name: "交易数目",
      type: "line",
      lineStyle: {
        normal: {
          color: "#146fd7",
          width: 5,
        },
      },
      //
      label: {
        normal: {
          show: false,
        },
      },
      symbolSize: 10,
      data: [
        1, 3, 4, 2, 2, 5, 5, 2, 7, 0, 0, 3, 8, 6, 5, 5, 1, 1, 8, 8, 7, 5, 4, 6,
        5, 6, 5, 1, 1, 4,
      ],
    },
  ],
};

export const map = {
  backgroundColor: "", //背景颜色
  title: {
    text: "",
    subtext: "",
    color: "#fff",
    x: "center",
  },
  //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
  visualMap: {
    // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
    type: "piecewise", // 类型为分段型
    top: "bottom",
    // calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
    right: 10,
    splitNumber: 6,
    seriesIndex: [0],
    itemWidth: 20, // 每个图元的宽度
    itemGap: 2, // 每两个图元之间的间隔距离，单位为px
    pieces: [
      // 自定义每一段的范围，以及每一段的文字
      { gte: 10000, label: "10000人以上", color: "#1890FF" }, // 不指定 max，表示 max 为无限大（Infinity）。
      {
        gte: 1000,
        lte: 9999,
        label: "1000-9999人",
        color: "#83C2FF",
      },
      {
        gte: 500,
        lte: 999,
        label: "500-999人",
        color: "#CDE5FF",
      },
      {
        gte: 100,
        lte: 499,
        label: "100-499人",
        color: "#E6F1FF",
      },
      {
        gte: 1,
        lte: 99,
        label: "1-99人",
        color: "#EBF3FF",
      },
      { lte: 0, label: "无", color: "#FAFAFA" }, // 不指定 min，表示 min 为无限大（-Infinity）。
    ],
    textStyle: {
      color: "#737373",
    },
  },
  // 提示框，鼠标移入
  tooltip: {
    show: true, //鼠标移入是否触发数据
    trigger: "item", //出发方式
    formatter: "{b}-用户数量：{c}",
  },
  //配置地图的数据，并且显示
  series: [
    {
      name: "地图",
      type: "map", //地图种类
      map: "china", //地图类型。
      data: [
        {
          name: "北京",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "天津",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "上海",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "重庆",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "河北",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "河南",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "云南",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "辽宁",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "黑龙江",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "湖南",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "安徽",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "山东",
          value: Math.round(Math.random() * 5000),
        },
        {
          name: "新疆",
          value: Math.round(Math.random() * 0),
        },
        {
          name: "江苏",
          value: Math.round(Math.random() * 5000),
        },
        {
          name: "浙江",
          value: Math.round(Math.random() * 50000),
        },
        {
          name: "江西",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "湖北",
          value: Math.round(Math.random() * 5000),
        },
        {
          name: "广西",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "甘肃",
          value: Math.round(Math.random() * 0),
        },
        {
          name: "山西",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "内蒙古",
          value: Math.round(Math.random() * 0),
        },
        {
          name: "陕西",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "吉林",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "福建",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "贵州",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "广东",
          value: Math.round(Math.random() * 500000),
        },
        {
          name: "青海",
          value: Math.round(Math.random() * 0),
        },
        {
          name: "西藏",
          value: Math.round(Math.random() * 0),
        },
        {
          name: "四川",
          value: Math.round(Math.random() * 5000),
        },
        {
          name: "宁夏",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "海南",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "台湾",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "香港",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "澳门",
          value: Math.round(Math.random() * 500),
        },
        {
          name: "南海诸岛",
          value: Math.round(Math.random() * 500),
        },
      ],
      itemStyle: {
        normal: {
          label: {
            show: true, //默认是否显示省份名称
          },
          areaStyle: {
            color: "#FAFAFA", //默认的地图板块颜色
          },
          borderWidth: 1,
          borderColor: "#D9D9D9",
        },
        //地图区域的多边形 图形样式。
        emphasis: {
          label: {
            show: true, //选中状态是否显示省份名称
          },
          areaStyle: {
            color: "#90c31d", //选中状态的地图板块颜色
          },
        },
      },
      zoom: 1, //放大比例
      label: {
        //图形上的文本标签，可用于说明图形的一些数据信息
        show: true,
      },
    },
    {
      type: "scatter",
      showEffectOn: "render", //配置什么时候显示特效
      coordinateSystem: "geo", //该系列使用的坐标系
      symbolSize: 10, //标记的大小
      data: [{ name: "宜昌", value: [111.3, 30.7, 130] }],
      zlevel: 99999,
    },
  ],
};
