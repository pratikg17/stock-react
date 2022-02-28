import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Form, TimePicker } from "antd";
import {
  getMarketHours,
  saveMarketHours,
} from "../../redux/actions/adminActions";
import moment from "moment";

import { Link } from "react-router-dom";
function MarketHours() {
  const dispatch = useDispatch();
  const { marketHours } = useSelector((state) => state.adminReducer);

  function onFinish(values) {
    console.log(values);
    let startTime = values.startTime.format("h:mm:ss");
    let endTime = values.endTime.format("h:mm:ss");
    let timeId = marketHours.timeId;

    let req = {
      startTime,
      endTime,
      timeId,
    };

    dispatch(saveMarketHours(req));
  }

  const [form] = Form.useForm();
  form.setFieldsValue({
    startTime: moment(marketHours.startTime, "HH:mm:ss"),
  });
  form.setFieldsValue({
    endTime: moment(marketHours.endTime, "HH:mm:ss"),
  });

  useEffect(() => {
    dispatch(getMarketHours());
  }, []);
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={12} sm={24}>
          <Form
            form={form}
            initialValues={marketHours}
            className="bs1 p-2"
            layout="vertical"
            onFinish={onFinish}
          >
            <h3>Change Market Hours / Schedule</h3>
            <hr />
            <Form.Item name="startTime" label="Start Time">
              <TimePicker size="large" />
            </Form.Item>
            <Form.Item name="endTime" label="End Time">
              <TimePicker size="large" />
            </Form.Item>

            <div className="text-right">
              <button className="btn1">SAVE CHANGES</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default MarketHours;
