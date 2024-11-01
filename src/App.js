import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, Modal, Select } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Br,
  Cut,
  Line,
  Printer,
  Row,
  Text,
  render,
} from "react-thermal-printer";
import { MenuComponent } from "./components/menu";
import { addCustomerDetails } from "./redux/slices/tablesSlice";
import store from "./redux/store";

const { Option } = Select;

export const App = () => {
  const { dispatch } = store;
  const [tableSidebarCollapsed, setTableSidebarCollapsed] = useState(false);
  const [billSidebarCollapsed, setBillSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableIndex, setTableIndex] = useState(0);
  const tables = useSelector((state) => state.tables);
  const [form] = Form.useForm();
  const tableOrder = useSelector((state) => state.tables[tableIndex]);

  useEffect(() => {
    console.log(tableOrder);
  }, [tableOrder]);
  const toggleTableSidebar = () => {
    if (billSidebarCollapsed) setBillSidebarCollapsed(false);
    else setTableSidebarCollapsed(!tableSidebarCollapsed);
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const renderSidebarItem = (element) => (
    <div className="flex justify-between items-center p-3 w-full rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      <div className="flex flex-col text-center w-full">
        <div className="font-bold text-gray-800">
          Table-{element.tableId + 1}
        </div>
        <div className="text-gray-600 text-sm">
          <span className="wrap-text">{element.customerName}</span>
        </div>
      </div>
      <button
        onClick={() => {
          console.log("clicked");
          setBillSidebarCollapsed(true);
        }}
        className="bg-green-500 hover:bg-green-600 px-3 py-1 text-sm border border-green-600 text-white rounded-md transition-all duration-200"
      >
        Bill
      </button>
    </div>
  );

  const sidebarItems = tables
    .filter((element) => element.customerName)
    .map((element) => ({
      key: element.tableId,
      icon: <ContainerOutlined />,
      label: renderSidebarItem(element),
      style: {
        height: tableSidebarCollapsed ? "4rem" : "5rem",
      },
    }));

  // Function to generate and save the receipt
  const generateReceipt = async () => {
    // Create the receipt structure
    const receipt = (
      <Printer type="epson" width={42} characterSet="latin">
        <Text size={{ width: 2, height: 2 }}></Text>
        <Text bold={true}>Orey's Cafe</Text>
        <Br />
        <Line />
        <Row left="Table" right={`${tableOrder.tableId + 1}`} />
        <Row left="Customer Name" right={tableOrder.customerName} />
        <Line />
        <Text bold={true}>Orders:</Text>
        <Br />
        {tableOrder.orders.map((element, index) => (
          <Row
            key={index}
            left={`${element.name} X ${element.quantity}`}
            right={`₹ ${element.price * element.quantity}`}
          />
        ))}
        <Br />
        <Line />
        <Row
          left="Total"
          right={`₹ ${tableOrder.orders.reduce(
            (total, element) => total + element.price * element.quantity,
            0
          )}`}
        />
        <Line />
        <Text align="center">Thank you for your order!</Text>
        <Cut />
      </Printer>
    );

    // Render the receipt to a Uint8Array
    const data = await render(receipt);

    // Create a Blob from the Uint8Array
    const blob = new Blob([data], { type: "application/octet-stream" });

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "receipt.txt"; // Name of the file to be downloaded
    link.click();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: `calc(100% - ${tableSidebarCollapsed ? 80 : 300}px)`,
            display: "flex",
            alignItems: "center",
          }}
          className="flex justify-between bg-slate-50 p-4 border-b bg-{#1677ff}"
        >
          <p className="text-3xl font-bold">Orey Cafe Menu</p>
          <div className="flex space-x-4">
            <Button type="primary" onClick={showModal}>
              New Order
            </Button>
            <Button
              type="text"
              icon={
                tableSidebarCollapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={toggleTableSidebar}
              className="flex items-center text-xl"
            />
          </div>
        </header>
        <div style={{ marginRight: tableSidebarCollapsed ? 80 : 300 }}>
          <MenuComponent tableIndex={tableIndex} />
        </div>
      </Layout>

      <Sider
        className="bg-white shadow-lg border-r"
        trigger={null}
        collapsible
        collapsed={tableSidebarCollapsed}
        width={300}
        style={{
          background: "#f8f9fa",
          padding: tableSidebarCollapsed ? "0" : "8px 12px",
          overflowY: "auto",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          height: "100vh",
          position: "fixed",
          insetInlineEnd: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[`${tableIndex}`]}
          items={sidebarItems}
          onClick={(e) => setTableIndex(parseInt(e.key, 10))}
          style={{
            height: "100%",
            borderRight: 0,
            overflowY: "auto",
          }}
        />
      </Sider>

      {billSidebarCollapsed && (
        <Sider
          className="bg-white shadow-lg border-l"
          trigger={null}
          collapsible
          collapsed={false}
          width={300}
          style={{
            position: "absolute",
            zIndex: 10,
            background: "#f8f9fa", // Light background color
            height: "100vh",
            right: 0,
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
            position: "fixed",
            insetInlineEnd: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}
        >
          {tableOrder ? (
            <div className="p-3 flex flex-col justify-between h-full">
              <div>
                <div className="text-center text-2xl font-bold text-gray-800 mb-2">
                  Table {tableOrder?.tableId + 1}
                </div>
                <div className="text-center my-4 font-semibold text-lg text-gray-600">
                  {tableOrder?.customerName}
                </div>
                <div className="font-semibold text-lg mb-4 text-gray-700 border-b pb-2">
                  Orders
                </div>
                <ul className="space-y-4">
                  {tableOrder?.orders && tableOrder.orders.length > 0 ? (
                    tableOrder.orders.map((element, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg border bg-white shadow-sm hover:bg-gray-50 transition-all"
                      >
                        <span className="border rounded-full flex justify-center items-center bg-gray-100 w-5 h-5 text-gray-800 font-semibold">
                          {element.quantity}
                        </span>
                        <img
                          alt="Illustration of Chicken Dimsum in a bamboo steamer with chopsticks and a leaf on a mat"
                          className="w-16 h-16 rounded-full border"
                          src="https://placehold.co/300x200"
                        />
                        <div className="flex flex-col">
                          <span className="text-md font-semibold text-gray-800">
                            {element.name}
                          </span>
                          <span className="text-gray-500">
                            ₹ {element.price}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 mt-4">
                      No orders available
                    </div>
                  )}
                </ul>
              </div>

              {/* Total amount and Print Bill button */}
              {tableOrder?.orders && tableOrder.orders.length > 0 && (
                <div className="mt-4 flex flex-col items-center">
                  <div className="font-bold text-lg text-gray-800 mb-2">
                    Total: ₹{" "}
                    {tableOrder.orders.reduce(
                      (total, element) =>
                        total + element.price * element.quantity,
                      0
                    )}
                  </div>
                  <button
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-blue-700"
                    onClick={() => {
                      // Add your print bill logic here
                      console.log("Print Bill");
                      generateReceipt();
                    }}
                  >
                    Print Bill
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              Select a table to view orders
            </div>
          )}
        </Sider>
      )}

      <Modal
        title="Add Order"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            dispatch(addCustomerDetails(values));
            setTableIndex(values.tableIndex);
            handleCancel();
          }}
        >
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customerNumber"
            label="Customer Number"
            rules={[
              { required: true, message: "Please enter customer number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tableIndex"
            label="Select Table"
            rules={[{ required: true, message: "Please select a table" }]}
          >
            <Select placeholder="Choose a table">
              {Array.from({ length: 20 }, (_, i) => (
                <Option key={i} value={i}>{`Table-${i + 1}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
