import React, { useRef, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Tour, Card } from "antd";
import { useNavigate } from "react-router-dom";
const Tours = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const steps = [
    {
      title: "Upload File",
      description: "Put your files here.",
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: "Save",
      description: "Save your changes.",
      target: () => {
        navigate("/events/new");
        ref2.current;
      },
    },
    {
      title: "Other Actions",
      description: "Click to see other actions.",
      target: () => ref3.current,
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <Button type="primary" onClick={() => setOpen(true)}>
          Begin Tour
        </Button>
        <Divider />
        <Space>
          <Button ref={ref1}> Upload</Button>
          <Button ref={ref2} type="primary">
            Save
          </Button>
          <Button ref={ref3} icon={<EllipsisOutlined />} />
        </Space>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </Card>
    </div>
  );
};
export default Tours;
