import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, Modal, Select } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { MenuComponent } from "./components/menu";
import store from "./redux/store";
import { addCustomerDetails } from "./redux/slices/tablesSlice";

const { Option } = Select;

export const App = () => {
  const { dispatch } = store;
  const [collapsed, setCollapsed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tableIndex, setTableIndex] = useState(0);

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("the tbale index in the app js is ", tableIndex);
  }, [tableIndex]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const temp = (
    <>
      <div className="bg-blue-400 w-9 h-9 flex ">check</div>
    </>
  );
  const sidebarItems = Array.from({ length: 10 }, (_, index) => ({
    key: index,
    icon: <ContainerOutlined />,
    label: `Table-${index + 1}`,
  }));

  return (
    <Layout>
      <Layout>
        <div className="flex justify-between">
          <p className="text-5xl font-bold py-4 px-6">Orey cafe Menu</p>
          <div className="flex">
            <Button type="primary" className="mt-8" onClick={showModal}>
              New Order
            </Button>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="grid place-content-center text-6xl px-16 !w-16 !h-16"
            />
          </div>
        </div>
        <MenuComponent tableIndex={tableIndex} />
      </Layout>
      <Sider
        className="bg-slate-100"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          className="bg-slate-100"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={sidebarItems}
          onClick={(e) => setTableIndex(e.key)}
          selectedKeys={[`${tableIndex}`]}
        />
      </Sider>

      <Modal
        title="Add Order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={(values) => {
            console.log(values);
            dispatch(addCustomerDetails(values));
            setTableIndex(values.tableIndex);
            handleCancel();
          }}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="CustomerName"
            label="Customer Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="CustomerNumber"
            label="Customer Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tableIndex"
            label="Select Table"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a option" allowClear>
              <Option value={0}>Table-1</Option>
              <Option value={1}>Table-2</Option>
              <Option value={2}>Table-3</Option>
              <Option value={3}>Table-4</Option>
              <Option value={4}>Table-5</Option>
              <Option value={5}>Table-6</Option>
              <Option value={6}>Table-7</Option>
              <Option value={7}>Table-8</Option>
              <Option value={8}>Table-9</Option>
              <Option value={9}>Table-10</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
  // return <MenuComponent />;
};
