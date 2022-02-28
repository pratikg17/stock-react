import React, { useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Space, Tag } from "antd";
import { getUserPortfolio } from "../../redux/actions/ordersActions";

function Portfolio() {
  const dispatch = useDispatch();
  const { portfolio } = useSelector((state) => state.ordersReducer);

  const getPercentChange = (record) => {
    let currentPrice = parseFloat(record.currentPrice).toFixed(4);
    let avgBuyPrice = parseFloat(record.avgBuyPrice).toFixed(4);
    console.log("avgBuyPrice", avgBuyPrice);
    console.log("currentPrice", currentPrice);
    let change = (((currentPrice - avgBuyPrice) / currentPrice) * 100).toFixed(
      2
    );
    console.log("change", change);

    if (parseFloat(currentPrice) >= parseFloat(avgBuyPrice)) {
      return <Tag color="green">+{change}%</Tag>;
    } else {
      return <Tag color="red">-{change}%</Tag>;
    }
  };

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
      title: "Daily High",
      dataIndex: "dailyHigh",
      key: "dailyHigh",
      render: (text, record) => (
        <Space size="middle">
          <Tag color="green">{"$" + record.dailyHigh.toFixed(4)}</Tag>
        </Space>
      ),
    },
    {
      title: "Daily Low",
      dataIndex: "dailyLow",
      key: "dailyLow",
      render: (text, record) => (
        <Space size="middle">
          <Tag color="red">{"$" + record.dailyLow.toFixed(4)}</Tag>
        </Space>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "noOfStocks",
      key: "noOfStocks",
    },
    {
      title: "Avg. Price",
      dataIndex: "avgBuyPrice",
      key: "avgBuyPrice",
      render: (text, record) => (
        <Space size="middle">
          {record.avgBuyPrice <= record.currentPrice ? (
            <Tag color="green">{"$" + record.avgBuyPrice.toFixed(4)}</Tag>
          ) : (
            <Tag color="red">{"$" + record.avgBuyPrice.toFixed(4)}</Tag>
          )}
        </Space>
      ),
    },

    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (text, record) => (
        <Space size="middle">
          {record.avgBuyPrice <= record.currentPrice ? (
            <Tag color="green">{"$" + record.currentPrice.toFixed(4)}</Tag>
          ) : (
            <Tag color="red">{"$" + record.currentPrice.toFixed(4)}</Tag>
          )}
        </Space>
      ),
    },

    {
      title: "Change %",
      render: (text, record) => (
        <Space size="middle">{getPercentChange(record)}</Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUserPortfolio());
  }, []);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Investor Portfolio</h3>
            <div className="d-flex justify-content-between align-items-center"></div>
          </div>
        </Col>
        <Space></Space>
        <Col lg={20} sm={24}>
          <Table dataSource={portfolio} columns={columns} pagination={false} />
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Portfolio;
