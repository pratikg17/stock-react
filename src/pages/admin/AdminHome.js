import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
function AdminHome() {
  return (
    <AdminLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <Link to={`/add-stocks/`}>Add Stocks</Link>
            </button>
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default AdminHome;
