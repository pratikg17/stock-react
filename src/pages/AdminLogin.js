import React, { useEffect } from "react";
import { Row, Col, Input, Form } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../redux/actions/userActions";

function AdminLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  function onFinish(values) {
    dispatch(adminLogin(values));
    console.log(values);
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin");
    if (isAuthenticated) {
      history.push("/admin-home");
    }
  });

  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"></img>
          <h1 className="login-logo">Stockverse - Admin</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <Form.Item
              name="userName"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2 ">Login </button>
            <hr />
            <Link to="/login">Click here for Investor Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLogin;
