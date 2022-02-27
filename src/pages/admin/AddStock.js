import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Col, Row, Form, Input } from "antd";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addStock } from "../../redux/actions/stocksActions";

function AddStock() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(addStock(values));
    console.log(values);
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New Stock</h3>
            <hr />
            <Form.Item
              name="stockName"
              label="Stock Name"
              rules={[{ required: true, message: "Please input stock name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tickerName"
              label="Ticker Name"
              rules={[{ required: true, message: "Please input ticker name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="volume"
              label="Volume (No. of share)"
              rules={[{ required: true, message: "Please input the volume" }]}
            >
              <Input type="number" addonAfter="#" />
            </Form.Item>
            <Form.Item
              name="initialPrice"
              label="Listing Price"
              rules={[
                { required: true, message: "Please input the listing price" },
              ]}
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
    </DefaultLayout>
  );
}

export default AddStock;
