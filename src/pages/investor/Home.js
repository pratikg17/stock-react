import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Space, Tag } from "antd";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { getAllStocks } from "../../redux/actions/stocksActions";
// import io from "socket.io-client";
import useWebSocket, { ReadyState } from "react-use-websocket";

function Home() {
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const { stocks } = useSelector((state) => state.stocksReducer);
  const [stocksPrice, setStocksPrice] = useState([]);

  const [socketUrl, setSocketUrl] = useState(
    "ws://localhost:5000/api/v1/stocks/get-live-stocks"
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const [isMarketOpen, setMarketOpen] = useState(false);
  const { lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("TETS", lastMessage);
      let msg = JSON.parse(lastMessage.data);
      let stockData = msg.stocks;
      let isMarketOpen = msg.isMarketOpen;
      setMessageHistory((prev) => prev.concat(lastMessage));
      setStocksPrice(stockData);
      setMarketOpen(isMarketOpen);
      dispatch({ type: "GET_ALL_STOCKS", payload: stockData });
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    dispatch(getAllStocks());
  }, []);

  console.log(stocks);
  console.log("stocksPrice", stocksPrice);
  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      {/* <Row justify="center" gutter={16} className="mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-1 mr-3">Dashboard</h3>
        </div>
      </Row> */}

      <Row gutter={[16, 8]} className="mt-5">
        <Col lg={12}>
          <h4>Stocks</h4>
          <div className="mt-1 mr-3 d-flex justify-content-between flex-row flex-wrap">
            {stocks.map((stock) => {
              return (
                <Col lg={12} className="mb-2">
                  <div className="car p-2 bs1">
                    <div className=" d-flex align-items-center justify-content-between">
                      <div className="text-left pl-2">
                        <p>
                          <Space size="middle">
                            <b>{stock.tickerName}</b>
                            <Tag color="orange">{stock.stockName}</Tag>
                          </Space>
                        </p>
                        <p></p>
                        <p>
                          <Space size="middle">
                            <div>Live Price</div>
                            <Tag color="green">
                              {"$" + parseFloat(stock.currentPrice).toFixed(2)}
                            </Tag>
                          </Space>
                        </p>
                        <p>
                          <Space size="middle">
                            <div>Daily High</div>
                            <Tag color="green">
                              {"$" + parseFloat(stock.dailyHigh).toFixed(2)}
                            </Tag>
                          </Space>
                        </p>
                        <p>
                          <Space size="middle">
                            Daily Low
                            <Tag color="red">
                              {"$" + parseFloat(stock.dailyLow).toFixed(2)}
                            </Tag>
                          </Space>
                        </p>
                        <p>
                          <Space size="middle">
                            Volume
                            <Tag color="blue">
                              {+parseFloat(stock.volume).toFixed(0)}
                            </Tag>
                          </Space>
                        </p>
                      </div>

                      <div>
                        <button className="btn1-green mr-2">
                          {/* <Link to={`/booking/${car._id}`}>Book Now</Link> */}
                          <Link>BUY</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </div>
        </Col>
        <Col lg={12}></Col>
      </Row>
    </DefaultLayout>
  );
}

export default Home;
