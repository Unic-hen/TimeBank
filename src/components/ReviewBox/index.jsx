import { Radio, Tag, Input } from "antd";
import DescLine from "@/components/DescLine";
import { useState } from "react";
const { TextArea } = Input;
const { CheckableTag } = Tag;
const ReviewBox = ({
  tags,
  setSelectedTags,
  selectedTags,
  setDescrip,
  style,
  footer,
  header,
}) => {
  /*
   * tags:标签列表
   * setSelectedTags:选择标签列表
   * setDescrip:设置描述
   * style:样式
   * footer:组件底部放什么
   * header:组件头部放什么
   */
  const [pass, setPass] = useState(false);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log(nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const handleClick = ({ target }) => {
    setPass(target.value);
  };
  const comment = [
    {
      label: "驳回原因",
      key: 2,
      desc: (
        <>
          <header>{header}</header>
          {tags.map((tag) => {
            return (
              <CheckableTag
                key={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            );
          })}
        </>
      ),
    },
    {
      label: "详细说明",
      block: true,
      key: 3,
      desc: (
        <TextArea
          rows={6}
          placeholder="如不通过，请详细描述原因"
          onChange={(e) => setDescrip(e.target.innerText)}
        />
      ),
    },
  ];

  return (
    <div style={style}>
      {comment.map((item) => {
        return <DescLine {...item} />;
      })}
      <footer>{footer}</footer>
    </div>
  );
};
export default ReviewBox;
