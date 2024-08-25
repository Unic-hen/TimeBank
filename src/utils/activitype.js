const activitype = [
  {
    value: "1000",
    label: "公益活动",
    children: [
      { value: "1001", label: "教育文化" },
      { value: "1002", label: "生活服务" },
      { value: "1003", label: "健身体育" },
      { value: "1004", label: "生产发展" },
      { value: "1005", label: "理论宣讲" },
      { value: "1006", label: "科技科普" },
      { value: "1007", label: "医疗健康" },
      { value: "1008", label: "其他公益服务" },
    ],
  },
  {
    value: "2000",
    label: "公益服务",
    children: [
      { value: "2001", label: "公益宣传" },
      { value: "2002", label: "维修养护" },
      { value: "2003", label: "环境清洁" },
      { value: "2004", label: "文体活动" },
      { value: "2005", label: "公共卫生" },
      { value: "2006", label: "问卷调查" },
      { value: "2007", label: "方案征集" },
    ],
  },
  {
    value: "3000",
    label: "关爱服务",
    children: [
      { value: "3001", label: "户外陪伴" },
      { value: "3002", label: "体检陪伴" },
      { value: "3003", label: "康复训练" },
      { value: "3004", label: "探访" },
    ],
  },
  {
    value: "4000",
    label: "家政服务",
    children: [
      { value: "4001", label: "清洁卫生" },
      { value: "4002", label: "买菜做饭" },
      { value: "4003", label: "衣帽养护" },
      { value: "4004", label: "家装养护类" },
    ],
  },
  {
    value: "5000",
    label: "上门服务",
    children: [
      { value: "5001", label: "日杂商品速递" },
      { value: "5002", label: "美容化妆" },
      { value: "5003", label: "订餐送餐" },
      { value: "5004", label: "家事料理" },
      { value: "5005", label: "代驾拼车" },
      { value: "5006", label: "家电类维修" },
      { value: "5007", label: "家具类维修" },
      { value: "5008", label: "水道类维修" },
    ],
  },
  {
    value: "6000",
    label: "培训教育",
    children: [
      { value: "6001", label: "家教补习" },
      { value: "6002", label: "成人教育" },
      { value: "6003", label: "课程辅导" },
      { value: "6004", label: "老年兴趣" },
      { value: "6005", label: "艺术课程" },
      { value: "6006", label: "体育课程" },
    ],
  },
  {
    value: "7000",
    label: "文体艺术",
    children: [
      { value: "7001", label: "字画装裱" },
      { value: "7002", label: "文玩印章" },
      { value: "7003", label: "乐器维修" },
      { value: "7004", label: "服装道具" },
      { value: "7005", label: "书法绘画" },
      { value: "7006", label: "陪练代练" },
    ],
  },
  {
    value: "8000",
    label: "专业技术",
    children: [
      { value: "8001", label: "财务理财" },
      { value: "8002", label: "建筑装修" },
      { value: "8003", label: "农牧渔业" },
      { value: "8004", label: "计算机相关" },
      { value: "8005", label: "美工设计" },
      { value: "8006", label: "专业写作" },
      { value: "8007", label: "法律援助" },
      { value: "8008", label: "其它行业" },
    ],
  },
  {
    value: "9000",
    label: "其他",
    children: [{ value: "9001", label: "其他" }],
  },
];
export const getCode = (type) => {
  return activitype.filter((item) => item.label == type)[0].value;
};
export const getType = (code) => {
  return activitype.find((item) => item.value == code).label;
};
export default activitype;
