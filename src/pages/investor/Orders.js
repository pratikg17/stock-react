import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Space, Tag } from "antd";
import { getAllOrdersByUser } from "../../redux/actions/ordersActions";
import Moment from "react-moment";

import { Link } from "react-router-dom";
function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.ordersReducer);

  const [totalOrders, setTotalOrders] = useState([]);

  useEffect(() => {
    setTotalOrders(orders);
  }, [orders]);

  const columns = [
    {
      title: "Order Date",
      dataIndex: "created_at",
      render: (text) => <Moment format="MMM Do YYYY, h:mm:ss a">{text}</Moment>,
    },
    {
      title: "Stock",
      dataIndex: "tickerName",
      key: "tickerName",
    },
    {
      title: "Fulfilled Quantity",
      dataIndex: "fulfilledQuantity",
      key: "fulfilledQuantity",
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
          {record.orderType == "MARKET" ? (
            <div style={{ textDecoration: "line-through" }}>
              {"$" + record.amount}
            </div>
          ) : (
            <div>{"$" + record.amount}</div>
          )}
        </Space>
      ),
    },

    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (text, record) => (
        <Space size="middle">
          {record.orderType == "MARKET" ? (
            <Tag color="blue">{text}</Tag>
          ) : (
            <Tag color="purple">{text}</Tag>
          )}
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
    dispatch(getAllOrdersByUser());
  }, []);
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Investor Orders</h3>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn1">
                <Link to={`/add-orders/`}>Add Orders</Link>
              </button>
            </div>
          </div>
        </Col>
        <Space></Space>
        <Col lg={20} sm={24}>
          <Table dataSource={orders} columns={columns} pagination={false} />;
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Orders;
