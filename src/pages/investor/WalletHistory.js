import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Space, Tag } from "antd";
import {
  getUserBalance,
  getUserWalletHistory,
} from "../../redux/actions/userActions";
import Moment from "react-moment";

import { Link } from "react-router-dom";
function WalletHistory() {
  const dispatch = useDispatch();
  const { walletBalance, walletHistory } = useSelector(
    (state) => state.userReducer
  );
  const [walletHistoryTxn, setWalletHistoryTxn] = useState([]);
  const [totalWalletBalance, setTotalWalletBalance] = useState([]);

  useEffect(() => {
    setTotalWalletBalance(totalWalletBalance);
  }, [totalWalletBalance]);

  useEffect(() => {
    setWalletHistoryTxn(walletHistoryTxn);
  }, [walletHistoryTxn]);

  const columns = [
    {
      title: "Date",
      dataIndex: "trasactiondate",
      render: (text) => <Moment format="MMM Do YYYY, h:mm:ss a">{text}</Moment>,
    },
    {
      title: "Note",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Amount",
      dataIndex: "credit_amount",
      key: "credit_amount",
      render: (text, record) => (
        <Space size="middle">
          {record.transaction_type == "CREDIT" ? (
            <div style={{ color: "green" }}>{"+$" + record.credit_amount}</div>
          ) : (
            <div style={{ color: "red" }}>{"-$" + record.debit_amount}</div>
          )}
        </Space>
      ),
    },

    {
      title: "Type",
      dataIndex: "transaction_type",
      key: "transaction_type",

      render: (text, record) => (
        <Space size="middle">
          {record.transaction_type == "DEBIT" ? (
            <Tag color="red">{record.transaction_type}</Tag>
          ) : (
            <Tag color="green">{record.transaction_type}</Tag>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUserWalletHistory());
    dispatch(getUserBalance());
  }, []);
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Investor Wallet</h3>
            <div className="btn1-blue"> Available Funds ${walletBalance}</div>
            <div className="d-flex justify-content-between align-items-center">
              <Space size="small">
                <button className="btn1-green">
                  <Link to={`/add-funds/`}>Add Funds</Link>
                </button>
                <button className="btn1-red">
                  <Link to={`/withdraw-funds/`}>Withdraw Funds</Link>
                </button>
              </Space>
            </div>
          </div>
        </Col>
        <Space></Space>
        <Col lg={20} sm={24}>
          <Table
            dataSource={walletHistory}
            columns={columns}
            pagination={false}
          />
          ;
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default WalletHistory;
