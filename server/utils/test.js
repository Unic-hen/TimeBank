const fs = require("fs");

fs.readFile("./area.json", (err, data) => {
  if (err) {
    console.log(err);
  }

  const datas = JSON.parse(data);
  console.log(datas["11"]);
});

// const handle = (data) => {
//   const children = [];

//   // data["11"];
// };
/*
const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];*/
