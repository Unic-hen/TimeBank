import InfoBox from "./components/InfoBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchAuditInfoResult } from "@/store/modules/audit";
import { useDispatch } from "react-redux";
import { message } from "antd";
const LookUser = () => {
  const [descrip, setDescrip] = useState("");
  const [selectedTags, setSelectedTags] = useState(["信息缺失"]);
  const [loginAudit, setLoginAudit] = useState(1);
  const tags = ["信息缺失", "未实名", "未成年", "其他原因"];
  const location = useLocation();
  console.log(location, "location");
  const { user } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async () => {
    const review = {
      mobile: user.mobile,
      remark: descrip,
      info: loginAudit,
      tags: selectedTags,
    };
    await dispatch(fetchAuditInfoResult(review))
      .then((res) => {
        message.success("提交成功");
        navigate("/admin/forlogin", { state: { e: user } });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <>
      <InfoBox
        user={user}
        loginAudit={loginAudit}
        setLoginAudit={setLoginAudit}
        onSubmit={onSubmit}
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setDescrip={setDescrip}
      />
    </>
  );
};
export default LookUser;
