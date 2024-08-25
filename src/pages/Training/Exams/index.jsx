import { Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const exams = [
  {
    id: 1,
    title: "老人培训测试1",
    description: "这是老人培训测试1",
    content: [
      `一、单项选择题`,
      `1.在为老年人提供日常照料服务时，以下哪项操作是不正确的？（单选）
A. 定期为老年人洗澡以保持清洁
B. 在未经老年人同意的情况下，随意翻动老年人的物品
C. 帮助老年人合理安排饮食，注意营养均衡
D. 定期与老年人进行情感交流，了解他们的心理需求`,
      `2.老年人突然发生呼吸困难时，志愿者应该首先采取以下哪项措施？（单选）
A. 立即拨打急救电话
B. 给老年人喝水以缓解不适
C. 让老年人躺下休息
D. 立即给老年人服用家中备有的药物`,
      `3.当老年人表达出不满或抱怨时，志愿者应该如何应对？（单选）
A. 忽视老年人的情绪，继续自己的工作
B. 立即反驳老年人的观点，证明自己的正确性
C. 耐心倾听老年人的抱怨，并尝试理解他们的感受
D. 告诉老年人他们的抱怨是无效的，不需要在意`,
      `二、多项选择题`,
      `1.在与老年人沟通时，以下哪些技巧是有效的？（多选）
A. 使用简单易懂的语言
B. 保持眼神交流
C. 快速讲述自己的观点，不留给老年人反应时间
D. 倾听老年人的观点，并适当给予反馈`,
      `2.以下哪些行为是志愿者在提供养老服务时应避免的？（多选）
A. 尊重老年人的隐私和个人空间
B. 随意更改老年人的生活习惯
C. 忽视老年人的情感需求
D. 在服务过程中保持耐心和细心`,
      `三、判断题`,
      `1.在为老年人提供服务时，志愿者应该始终以自己的意愿和想法为主。（ ）`,
      `2.当老年人出现身体不适时，志愿者应该立即拨打急救电话，并告知家属。（ ）`,
      `3.志愿者在提供养老服务时，可以随意谈论自己的私人问题，以增进与老年人的感情。（ ）`,
      `四、简答题`,
      `1.描述一下在模拟测试中，你遇到的一个关于老年人护理的难题，并说明你当时的解题思路和方法。`,
      `2.如果你在模拟测试中得分不高，你认为可能的原因是什么？你将如何改进自己的学习方法以提高成绩？`,
      `五、模拟情景题`,
      `1.假设你在为一位患有老年痴呆症的老年人提供服务时，发现他们突然忘记了回家的路。请结合你的培训知识，描述你应该采取的步骤和措施。（情景题）`,
    ],
  },
  {
    id: 2,
    title: "老人培训测试2",
    description: "这是老人培训测试2",
    content: [
      `一、选择题`,
      `1.在为老年人提供日常生活照料时，以下哪项是正确的？（单选）
    A. 随意更改老年人的饮食习惯
    B. 让老年人自行处理危险物品
    C. 尊重老年人的生活习惯和隐私
    D. 不关心老年人的情绪变化`,
      `2.在与老年人交流时，以下哪种做法是正确的？（单选）
    A. 使用过于复杂的词汇和句子
    B. 快速打断老年人的发言
    C. 倾听并适当给予反馈
    D. 只关注自己的话题`,
      `3.当老年人突然跌倒时，以下哪项是志愿者的首要行动？（单选）
    A. 立即扶起老年人
    B. 责备老年人不小心
    C. 检查老年人是否受伤并询问感受
    D. 忽视并继续自己的工作`,
      `二、判断题`,
      `1.志愿者应尊重老年人的个人空间，避免随意进入他们的房间。（ ）`,
      `2.当老年人表示想要外出散步时，志愿者应直接拒绝，以防止发生意外。（ ）`,
      `3.在为老年人提供护理服务时，志愿者应仔细洗手并佩戴手套，以确保卫生。（ ）`,
      `三、简答题`,
      `1.描述一下志愿者在提供养老服务时应如何尊重老年人的隐私？`,
      `2.当老年人出现记忆力减退的情况时，志愿者应该如何应对？`,
      `四、情景模拟题`,
      `1.假设你是一名时间养老银行的志愿者，你正在为一位患有糖尿病的老年人提供服务。请描述你将如何为这位老年人提供合适的饮食安排？
    `,
    ],
  },
];
const PageBox = ({ exam }) => {
  //   axios.get("http://localhost:5000/api/paper/list").then((res) => {
  //     console.log(res.data);
  //   });
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      onClick={() => navigate("/train/test", { state: { exam } })}
      style={{ height: 160, margin: 10 }}
      cover={
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            padding: "10px 30px 5px",
          }}
        >
          <sapn>
            得分:<span style={{ color: "#999" }}>暂无得分</span>
          </sapn>
        </div>
      }
    >
      <Card.Meta title={exam.title} description={exam.description} />
    </Card>
  );
};
const Exams = () => {
  return (
    <div>
      {exams.map((exam) => (
        <PageBox key={exam.id} exam={exam} />
      ))}
    </div>
  );
};
export default Exams;
