import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Col, Row, Form, Input } from "antd";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { withdrawInvestorFunds } from "../../redux/actions/userActions";

function WithdrawFunds() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(withdrawInvestorFunds(values));
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Withdraw Funds ($)</h3>
            <hr />
            <Form.Item
              name="amount"
              label="Withdraw Fund Amount"
              rules={[{ required: true, message: "Please valid amount" }]}
            >
              <Input type="number" addonAfter="$" min={1} />
            </Form.Item>

            <div className="text-right">
              <button className="btn1">WITHDRAW FUNDS</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default WithdrawFunds;
