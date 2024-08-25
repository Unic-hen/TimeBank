import { useEffect } from "react";
import "./index.scss";
import $ from "jquery";
const PanelBox = ({ data, thead, style }) => {
  const scrollBox = {
    height: 270,
    overflow: "auto",
    position: "relative",
  };
  useEffect(() => {
    let str1 = "";
    let scrollContent = document.getElementsByClassName("scroll-box").item(0);
    let table = document.getElementsByClassName("scroll-tab").item(0);
    for (let n = 0; n < data.length; n++) {
      let item = data[n];
      str1 += `
        <tr style="height:24px ">
            <td style="width:${thead[0].width}px">${item.block}</td>
            <td style="width:${thead[1].width}px">${item.hash}</td>
            <td style="width:${thead[2].width}px">${item.status}</td>
            <td style="width:${thead[3].width}px">${item.pay}</td>
            <td style="width:${thead[4].width}px">${item.cashier}</td>
            <td style="width:${thead[5].width}px">${item.paytime}</td>
            <td style="width:${thead[6].width}px">${item.volume}</td>
        </tr>`;
    }
    $(".scrollContent").append(str1);
    $(".scrollContent").append(str1);

    //滚动函数
    function roll(t) {
      var timer = setInterval(rollStart, t); // 间隔时间t
      // 鼠标移入table时暂停滚动
      table.onmouseover = function () {
        clearInterval(timer);
      };
      // 鼠标移出table后继续滚动
      table.onmouseout = function () {
        timer = setInterval(rollStart, t);
      };
    }

    // 开始滚动函数
    function rollStart() {
      // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
      if (scrollContent.scrollTop >= scrollContent.scrollHeight / 2) {
        //注此处高度相当于为俩个tbody高度 需除2
        scrollContent.scrollTop = 0;
      } else {
        scrollContent.scrollTop++;
      }
    }
    //执行函数
    roll(50);
  });
  return (
    <div style={style} className="panel">
      <div style={{ overflow: "auto", width: "100%", position: "relative" }}>
        <table>
          <thead style={{ width: "100%", marginBottom: 10 }}>
            <tr>
              {thead.map((item) => {
                return (
                  <th style={{ width: item.width }} key={item.key}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
        </table>
      </div>
      <div className="scroll-box" style={scrollBox}>
        <table className="scroll-tab">
          <tbody
            className="scrollContent"
            style={{ textAlign: "center" }}
          ></tbody>
        </table>
      </div>
    </div>
  );
};
export default PanelBox;
