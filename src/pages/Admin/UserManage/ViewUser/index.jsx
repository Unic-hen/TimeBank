import InfoBox from "@/components/InfoBox";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { updateInfo, updatePwd } from "@/store/modules/user";
import { fetchUserList } from "@/store/modules/control";

const ViewUser = () => {
  // states
  const [edit, setEdit] = useState(true);
  // hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = location.state;
  const [usr, setUsr] = useState(user);
  console.log(usr, "usr");
  // funcs
  const handleSubmit = async (e) => {
    Object.keys(e).filter((key) => {
      if (e[key] === undefined) {
        delete e[key];
      }
    });
    console.log({ ...user, ...e });
    await dispatch(updateInfo({ ...user, ...e }))
      .then((res) => {
        message.success("信息修改成功");
        console.log(res, "res");
        setUsr({ ...user, ...e });
        setEdit(true);
      })
      .catch((err) => {
        message.error("信息修改失败", err);
        console.log(err);
      });
    dispatch(
      fetchUserList({
        page: 1,
        pageSize: 10,
      })
    );
    // window.location.reload();
  };
  const reset = () => {
    dispatch(updatePwd({ mobile: user.mobile, newPwd: "123456" }))
      .then((res) => {
        message.success("密码已重置: 123456");
      })
      .catch((err) => {
        message.error("密码重置失败", err);
      });
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <InfoBox user={usr} edit={edit} submit={handleSubmit} />
        <Card style={{ width: "100%" }}>
          <div
            style={{
              width: 160,
              height: 100,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              zIndex: 99,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setEdit(false)}
            >
              编辑信息
            </Button>
            {!edit && <Button onClick={() => setEdit(true)}>取消</Button>}
            <Button
              style={{ marginTop: 20 }}
              type="primary"
              htmlType="submit"
              onClick={reset}
            >
              重置密码
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
export default ViewUser;
