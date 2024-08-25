import { useNavigate } from "react-router-dom";
// import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input, message } from "antd";
import InfoBox from "./components/InfoBox";
import { useEffect, useState } from "react";
import { updateInfo, updatePwd, fetchLogin } from "@/store/modules/user";

const UserInfo = () => {
  const navigate = useNavigate();
  // states
  const [edit, setEdit] = useState(true);
  const [editpwd, setEditPwd] = useState(false);

  // hooks
  const dispatch = useDispatch();

  // 用户和数据
  let user = useSelector((state) => state.user.userInfo);
  // funcs
  const handleSubmit = async (e) => {
    Object.keys(e).filter((key) => {
      if (e[key] === undefined) {
        delete e[key];
      }
    });
    await dispatch(updateInfo({ ...user, ...e }))
      .then((res) => {
        message.success("信息修改成功");
        window.location.reload();
      })
      .catch((err) => {
        message.error("信息修改失败", err);
      });
    await dispatch(
      fetchLogin({ mobile: user.mobile, password: user.password })
    );
  };
  const changePwd = async (e) => {
    await dispatch(updatePwd({ mobile: user.mobile, newPwd: e.password }))
      .then((res) => {
        message.success("密码修改成功");
      })
      .catch((err) => {
        message.error("密码修改失败", err);
      });
  };
  return (
    <div className="pcuserinfo">
      <div className="user">
        {user.name ? (
          <div style={{ display: "flex", justifyContent: "left" }}>
            <InfoBox
              user={user}
              edit={edit}
              editpwd={editpwd}
              submit={handleSubmit}
              change={changePwd}
            />
            <div
              style={{
                // position: "absolute",
                // right: 80,
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
                onClick={() => setEditPwd(true)}
              >
                修改密码
              </Button>
              {editpwd && (
                <Button
                  style={{ marginTop: 20 }}
                  onClick={() => setEditPwd(false)}
                >
                  取消
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              您还未登陆,<Link to="/login">点击登陆</Link>
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
