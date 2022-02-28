import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Space, Tag, Button } from "antd";
import {
  getAllOrdersByUser,
  cancelOrder,
  getAllTradesByUser,
} from "../../redux/actions/ordersActions";
import Moment from "react-moment";

import { Link } from "react-router-dom";
function Orders() {
  const dispatch = useDispatch();
  const { trades } = useSelector((state) => state.ordersReducer);

  const columns = [
    {
      title: "Trade ID",
      dataIndex: "tradeId",
      key: "tradeId",
      render: (text) => (
        <Tag color="blue">{text.substr(text.length - 10).toUpperCase()}</Tag>
      ),
    },
    {
      title: "Order ID",
      dataIndex: "ordersId",
      key: "ordersId",
      render: (text) => (
        <Tag color="orange">{text.substr(text.length - 10).toUpperCase()}</Tag>
      ),
    },

    {
      title: "Trade Date",
      dataIndex: "createdAt",
      render: (text) => <Moment format="MMM Do YYYY, h:mm:ss a">{text}</Moment>,
    },
    {
      title: "Stock",
      dataIndex: "tickerName",
      key: "tickerName",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Price",
      render: (text, record) => (
        <Space size="middle">
          {record.tradeType == "BUY" ? (
            <Tag color="green">${record.buyAmount}</Tag>
          ) : (
            <Tag color="red">${record.sellAmount}</Tag>
          )}
        </Space>
      ),
    },

    {
      title: "Current Price",
      render: (text, record) => (
        <Space size="middle">
          <Tag color="green">${record.currentPrice}</Tag>
        </Space>
      ),
    },

    {
      title: "Trade Type",
      dataIndex: "tradeType",
      key: "tradeType",
      render: (text, record) => (
        <Space size="middle">
          {record.tradeType == "BUY" ? (
            <Tag color="green">{text}</Tag>
          ) : (
            <Tag color="red">{text}</Tag>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllTradesByUser());
  }, []);
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Trade History</h3>
          </div>
        </Col>
        <Space></Space>
        <Col lg={20} sm={24}>
          <Table dataSource={trades} columns={columns} pagination={false} />;
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Orders;
