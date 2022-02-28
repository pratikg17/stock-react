import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Space, Tag, Button } from "antd";
import {
  getAllOrdersByUser,
  cancelOrder,
} from "../../redux/actions/ordersActions";
import Moment from "react-moment";

import { Link } from "react-router-dom";
function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.ordersReducer);

  const [totalOrders, setTotalOrders] = useState([]);

  const getOrderStatus = (status) => {
    if (status === "PLACED") {
      return <Tag color="#2db7f5">{status}</Tag>;
    } else if (status === "EXECUTED") {
      return <Tag color="#87d068">{status}</Tag>;
    } else if (status === "PARTIALLY_EXECUTED") {
      return <Tag color="lime">{status}</Tag>;
    } else {
      return <Tag color="#f50">{status}</Tag>;
    }
  };

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

    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text, record) => (
        <Space size="middle">{getOrderStatus(record.orderStatus)}</Space>
      ),
    },
    {
      title: "Order Expiry",
      dataIndex: "expiryDate",
      render: (text) => <Moment format="MMM Do YYYY, h:mm: a">{text}</Moment>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/edit-stocks/${record.stockId}`}>
            <Button type="primary" disabled={record.orderStatus != "PLACED"}>
              EDIT
            </Button>
          </Link>

          <Button
            type="danger"
            disabled={record.orderStatus != "PLACED"}
            onClick={cancelOrderBtn.bind(this, record.ordersId)}
          >
            CANCEL
          </Button>
        </Space>
      ),
    },
  ];

  function cancelOrderBtn(orderId) {
    console.log(orderId);
    dispatch(cancelOrder(orderId));
  }
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
                <Link to={`/add-buy-orders/`}>Add Orders</Link>
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
