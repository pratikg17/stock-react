import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Col, Row, Form, Input } from "antd";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addInvestorFunds } from "../../redux/actions/userActions";

function AddFunds() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(addInvestorFunds(values));
    console.log(values);
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add Funds ($)</h3>
            <hr />
            <Form.Item
              name="amount"
              label="Deposit Fund Amount"
              rules={[{ required: true, message: "Please valid amount" }]}
            >
              <Input type="number" addonAfter="$" min={100} />
            </Form.Item>

            <div className="text-right">
              <button className="btn1">ADD FUNDS</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddFunds;
