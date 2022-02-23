import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";

function AdminLayout(props) {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const menu = (
    <Menu>
      <Menu.Item key="admin">
        <Link to="/admin-home">Home</Link>
      </Menu.Item>
      <Menu.Item key="admin-stocks">
        <Link to="/add-stocks">Add Stocks</Link>
      </Menu.Item>
      <Menu.Item key="admin-hours">
        <Link to="/market-hours">Market Hours</Link>
      </Menu.Item>
      <Menu.Item key="admin-holidays">
        <Link to="/market-holidays">Market Holidays</Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("admin");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        <li style={{ color: "orangered" }}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>Stockverse</h1>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{admin.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default AdminLayout;
