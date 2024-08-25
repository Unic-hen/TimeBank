import {
  Form,
  Button,
  Input,
  Cascader,
  DatePicker,
  InputNumber,
  Tooltip,
  Typography,
  Upload,
  Space,
  message,
  Modal,
  Select,
} from "antd";
import { IsPC } from "@/utils/equipment";
import { useEffect, useMemo, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import area from "@/utils/area";
import activitype from "@/utils/activitype";
import {
  fetchDemander,
  updateService,
  createService,
} from "@/store/modules/service";
import moment from "moment";
import { getType, getCode } from "@/utils/activitype";
moment.locale("zh-cn");

// useSelector获取
const user = {
  older: "李四",
  mobile: "13812345678",
};
const rules = {
  serviceName: [],
  serviceDesc: [],
  serviceNums: [],
  servicetime: [],
  entrolltime: [],
  timeCoin: [],
  serviceAdd: [],
  address: [],
};
// base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const New = () => {
  // 用户
  const user = useSelector((state) => state.user.userInfo);

  const [mobile, setMobile] = useState(user.mobile);
  const [disabled, setDisabled] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [service, setService] = useState({});
  const navigate = useNavigate();

  // 计算每人coin
  const [per, setPer] = useState(0);
  // 若是编辑，需要回显数据
  const location = useLocation();
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  // 回显数据
  const toM2 = (string) => {
    return new Date(string);
  };
  const fillback = (service) => {
    // 地区处理
    let areas = service.serviceAddress.split("-");
    let provence = area.find((item) => item.label == areas[0]);
    let city = provence.children.find((item) => item.label == areas[1]);
    let county = city.children.find((item) => item.label == areas[2]);
    const address = [provence.value, city.value, county.value];
    form.setFieldsValue({ ...service });
    form.setFieldsValue({ serviceAdd: address, address: areas[3] });
    form.setFieldsValue({ type: getType(service.serviceType) });
    // 图片回显
    setFileList([{ response: { data: { url: service.serviceImg } } }]);
    // 时间回显
    form.setFieldValue({
      servicetime: [toM2(service.startTime), toM2(service.endTime)],
      // entrolltime: [
      //   moment(service.entrollTimeStart),
      //   moment(service.entrollTimeEnd),
      // ],
    });
  };
  useEffect(() => {
    try {
      const { service } = location.state;
      console.log(service, "service");
      fillback(service);
      setService(service);
      setEdit(true);
      location.state = null;
    } catch (e) {}
  }, [setService]);
  // 提交
  const dispatch = useDispatch();
  // 地区处理
  const handleAdd = (fieldsValue, serviceAdd) => {
    let provence = area.find((item) => item.value == serviceAdd[0]);
    let city = provence.children.find((item) => item.value == serviceAdd[1]);
    let county = city.children.find((item) => item.value == serviceAdd[2]);
    return [provence.label, city.label, county.label, fieldsValue["address"]];
  };
  const onFinish = async (fieldsValue) => {
    // 时间处理
    const servicetime = fieldsValue["servicetime"];
    const entrolltime = fieldsValue["entrolltime"];
    console.log(fieldsValue, "fielfs");

    const address = handleAdd(fieldsValue, fieldsValue.serviceAdd);
    // 接口数据
    const values = {
      ...fieldsValue,
      ...{
        entrollTimeStart:
          Object.keys(service).length != 0
            ? service.entrollTimeStart
            : entrolltime[0].format("YYYY-MM-DD HH:mm:ss"),
        entrollTimeEnd:
          Object.keys(service).length != 0
            ? service.entrollTimeEnd
            : entrolltime[1].format("YYYY-MM-DD HH:mm:ss"),
      },
      ...{
        startTime:
          Object.keys(service).length != 0
            ? service.startTime
            : servicetime[0].format("YYYY-MM-DD HH:mm:ss"),
        endTime:
          Object.keys(service).length != 0
            ? service.endTime
            : servicetime[1].format("YYYY-MM-DD HH:mm:ss"),
      },
      serviceType: fieldsValue.type
        ? Array.isArray(fieldsValue.type)
          ? fieldsValue.type[0]
          : parseInt(getCode(fieldsValue.type))
        : "",
      serviceAddress: address.join("-"),
      older: user.name,
      serviceImg:
        fileList[0].response.data.url ||
        "https://img2.imgtp.com/2024/04/24/VCr8CveG.png",
      servicePhone: user.mobile,
    };
    console.log("Received values of form: ", values);
    if (edit) {
      console.log({ ...values, id: service.id }, "update");
      await dispatch(updateService({ ...values, id: service.id })).then(
        (res) => {
          message.success("修改成功,即将跳转到当前活动", 0.8);
          navigate("/events/currentevents");
        }
      );
      return;
    }
    await dispatch(createService(values)).then((res) => {
      message.success("创建成功,即将跳转到当前活动", 0.8);
      dispatch(fetchDemander()); // 同时需求者重新获取后端历史服务数据
    });
    setTimeout(() => {
      navigate("/events/currentevents");
    }, 800);
  };
  // 输入限制配置
  const rules = {
    serviceName: [{ required: true, message: "请输入活动名称" }],
    serviceDesc: [{ required: true, message: "请选择活动描述" }],
    serviceNums: [
      {
        required: true,
        type: "number",
        min: 0,
        message: "活动人数无效",
        onblur,
      },
    ],
    servicetime: edit
      ? []
      : [{ type: "array", required: true, message: "请选择活动时间" }],
    entrolltime: edit
      ? []
      : [{ type: "array", required: true, message: "请选择报名时间" }],
    timeCoin: [
      { type: "number", min: 0, message: "时间币无效", onblur },
      { required: true, message: "请填写时间币" },
    ],
    serviceAdd: [{ required: true, message: "请输入活动地址" }],
    address: [{ required: true, message: "请输入详细地址" }],
  };
  const changeMobile = () => {
    setDisabled(false);
  };

  // 处理图片
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);

    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ file, fileList }) => {
    setFileList(fileList);
    console.log(fileList);
  };

  // 处理每人时间币显示
  const [nums, setNums] = useState(1);
  const [total, setTotal] = useState(0);
  useMemo(() => {
    setPer((total / nums).toFixed(2));
  }, [nums, total]);
  return IsPC ? (
    <>
      <div className="pcnew">
        <h1>请完成下列活动信息的填写</h1>
        <Form
          form={form}
          onFinish={(e) => onFinish(e)}
          labelCol={{ span: 6 }}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            label="活动名称"
            name="serviceName"
            rules={rules.serviceName}
          >
            <Input placeholder="请输入活动名称" />
          </Form.Item>
          <Form.Item
            label="活动内容"
            name="serviceDesc"
            rules={rules.serviceDesc}
          >
            <Input.TextArea placeholder="请输入需要志愿者完成的内容" rows={4} />
          </Form.Item>

          <Form.Item label="活动类型" name="type">
            <Cascader
              placeholder="请选择活动类型"
              onChange={(e) => console.log(e)}
              options={activitype}
            />
          </Form.Item>
          <Form.Item label="活动须知" name="notice">
            <Input.TextArea placeholder="请输入活动须知" rows={4} />
          </Form.Item>
          <Form.Item
            label="活动地点"
            name="serviceAdd"
            rules={rules.serviceAdd}
          >
            <Cascader
              onChange={(e) => console.log(e)}
              options={area}
              placeholder="请选择活动地点"
            />
          </Form.Item>
          <Form.Item label="详细地址" name="address" rules={rules.address}>
            <Input placeholder="请输入详细地址" />
          </Form.Item>
          <Form.Item label="时间币" name="timeCoin" rules={rules.timeCoin}>
            <InputNumber
              addonAfter={
                <>
                  <span> 个</span>
                  <span style={{ margin: 10 }}>{per} 个时间币/人</span>
                </>
              }
              onChange={(e) => setTotal(e)}
            />
          </Form.Item>
          <Form.Item label="发起人" name="older">
            <Input placeholder={user.name} disabled />
          </Form.Item>
          <Form.Item label="联系方式" name="servicePhone">
            <Space>
              <Input
                value={mobile}
                disabled={disabled}
                style={{ width: 320, marginRight: 8 }}
              />
              <Tooltip title="点击修改联系电话">
                <Typography.Link>
                  <EditOutlined onClick={changeMobile} />
                </Typography.Link>
              </Tooltip>
            </Space>
          </Form.Item>

          <Form.Item
            label="招募人数"
            name="serviceNums"
            rules={rules.serviceNums}
          >
            <InputNumber
              addonAfter="人"
              onChange={(e) => {
                if (e != 0) {
                  setNums(e);
                }
              }}
            />
          </Form.Item>
          <Form.Item label="活动封面" name="serviceImg">
            <Upload
              action={"http://geek.itheima.net/v1_0/upload"}
              listType="picture-card"
              fileList={fileList}
              name="image"
              showUploadList
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : (
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="servicetime"
            label="活动时间"
            rules={rules.servicetime}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(e) => console.log(typeof e[0])}
              placeholder={
                edit
                  ? [service.startTime, service.endTime]
                  : ["开始时间", "结束时间"]
              }
            />
          </Form.Item>
          <Form.Item
            label="报名时间"
            name="entrolltime"
            rules={rules.entrolltime}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={
                edit
                  ? [service.entrollTimeStart, service.entrollTimeEnd]
                  : ["开始时间", "结束时间"]
              }
            />
          </Form.Item>
          {!edit ? (
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              重新提交
            </Button>
          )}
        </Form>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </div>
    </>
  ) : (
    <>nothing</>
  );
};
export default New;
