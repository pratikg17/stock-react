import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Button, Space } from "antd";
import { getAllStocks } from "../../redux/actions/stocksActions";

import { Link } from "react-router-dom";
function AdminHome() {
  const dispatch = useDispatch();
  const { stocks } = useSelector((state) => state.stocksReducer);
  const [totalStocks, setTotalStocks] = useState([]);
  useEffect(() => {
    setTotalStocks(stocks);
  }, [stocks]);

  const columns = [
    {
      title: "Ticker",
      dataIndex: "tickerName",
      key: "tickerName",
    },
    {
      title: "Stock Name",
      dataIndex: "stockName",
      key: "stockName",
    },
    {
      title: "Volume(# of Stocks)",
      dataIndex: "volume",
    },
    {
      title: "Initial Price (Listing Price)",
      dataIndex: "initialPrice",
      render: (text) => <a>{"$" + text}</a>,
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      render: (text) => <a>{"$" + text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/edit-stocks/${record.stockId}`}>
            <Button type="primary">Edit</Button>
          </Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllStocks());
  }, []);
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Stocks List</h3>
            <button className="btn1">
              <Link to={`/add-stocks/`}>Add Stocks</Link>
            </button>
          </div>
        </Col>
        <Space></Space>
        <Col lg={20} sm={24}>
          <Table dataSource={totalStocks} columns={columns} />;
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
