import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = (
    <div>
      <Menu>
        <Menu.Item as="div" key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item as="div" key="investor-portfolio">
          <Link to="/portfolio">Portfolio</Link>
        </Menu.Item>
        <Menu.Item as="div" key="investor-orders">
          <Link to="/orders">Orders</Link>
        </Menu.Item>
        <Menu.Item as="div" key="investor-trades">
          <Link to="/trades">Trades History</Link>
        </Menu.Item>
        <Menu.Item as="div" key="investor-wallet">
          <Link to="/wallet">Wallet</Link>
        </Menu.Item>
        <Menu.Item
          as="div"
          key="logout-user"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <li style={{ color: "orangered" }}>Logout</li>
        </Menu.Item>
      </Menu>
    </div>
  );

  const adminMenu = (
    <div>
      <Menu>
        <Menu.Item as="div" key="admin">
          <Link to="/admin-home">Home</Link>
        </Menu.Item>
        <Menu.Item as="div" key="admin-stocks">
          <Link to="/add-stocks">Add Stocks</Link>
        </Menu.Item>
        <Menu.Item as="div" key="admin-hours">
          <Link to="/market-hours">Market Hours</Link>
        </Menu.Item>
        {/* <Menu.Item as="div" key="admin-holidays">
          <Link to="/market-holidays">Market Holidays</Link>
        </Menu.Item> */}
        <Menu.Item
          as="div"
          key="logout-admin"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("admin");
            localStorage.removeItem("token");
            window.location.href = "/admin";
          }}
        >
          <li style={{ color: "orangered" }}>Logout</li>
        </Menu.Item>
      </Menu>
    </div>
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>Stockverse</h1>

              {user.isAdmin ? (
                <Dropdown overlay={adminMenu} placement="bottomCenter">
                  <Button>{user.userName}</Button>
                </Dropdown>
              ) : (
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Button>{user.userName}</Button>
                </Dropdown>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
