// 待定
const UserTable = () => {
  const columns = [
    {
      title: "用户姓名",
      dataIndex: "name",
      key: "name",
      render: (text, service) => (
        <a onClick={() => handleClick(service)}>{text}</a>
      ),
    },
    {
      title: "信息完善",
      dataIndex: "fullInfo",
      key: "fullInfo",
    },
    {
      title: "课程进度",
      dataIndex: "courseProgress",
      key: "courseProgress",
    },
    {
      title: "身体状况",
      key: "physicalCondition",
      dataIndex: "physicalCondition",
    },
    {
      title: "审核状态",
      key: "serviceAudit",
      dataIndex: "serviceAudit",
    },
    {
      title: "操作",
      key: "serviceid",
      dataIndex: "serviceid",
      render: () => (
        <Space size="middle">
          <a onClick={pass}>通过</a>
          <a onClick={reject}>驳回</a>
        </Space>
      ),
    },
  ];
};
export default UserTable;
