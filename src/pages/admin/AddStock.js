import React from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  Col,
  Row,
  Divider,
  DatePicker,
  Checkbox,
  Edit,
  Form,
  Input,
  InputNumber,
} from "antd";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";

// import { addCar } from "../redux/actions/carsActions";

function AddStock() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    // dispatch(addCar(values));
    console.log(values);
  }
  return (
    <AdminLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New Stock</h3>
            <hr />
            <Form.Item
              name="stockName"
              label="Stock Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tickerName"
              label="Ticker Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="volume"
              label="Volume (No. of share)"
              rules={[{ required: true }]}
            >
              <Input type="number" addonAfter="#" />
            </Form.Item>
            <Form.Item
              name="intialPrice"
              label="Listing Price"
              rules={[{ required: true }]}
            >
              <Input type="number" addonAfter="$" />
              {/* <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} /> */}
            </Form.Item>

            <div className="text-right">
              <button className="btn1">ADD STOCK</button>
            </div>
          </Form>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default AddStock;
