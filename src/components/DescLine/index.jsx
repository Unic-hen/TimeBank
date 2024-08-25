import React from "react";

class DescLine extends React.Component {
  // ({ label, desc, style, size, key, rowspan, block })
  /*
   * label:名称
   * desc:值
   * style:样式
   * size:字体大小
   * key:唯一标识
   * rowspan:名称与值的宽度列表[]
   * block:加上时换行
   */

  render() {
    const { label, desc, style, size, rowspan, block } = this.props;
    const desc_box_style = {
      margin: "15px 0",
      ...style,
      fontSize: size,
    };
    const label_style = {
      display: block ? "block" : "inline-block",
      width: rowspan ? rowspan[0] * 10 : 68,
    };
    const desc_style = {
      display: block ? "block" : "inline-block",
      marginLeft: 5,
      width: rowspan ? rowspan[1] * 10 : 300,
      textIndent: block ? "2em" : "",
      marginTop: block ? 10 : 0,
    };
    return (
      label &&
      desc && (
        <div style={desc_box_style}>
          {block ? (
            <div>
              <p style={label_style}>{label}:</p>
              <p style={desc_style}>{desc}</p>
            </div>
          ) : (
            <>
              <span style={{}}></span>
              <span style={label_style}>{label}</span>:
              <span style={desc_style}>{desc}</span>
            </>
          )}
        </div>
      )
    );
  }
}
export default DescLine;
