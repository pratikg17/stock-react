import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Space, Tag } from "antd";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { getAllStocks } from "../../redux/actions/stocksActions";
import { webSocketUrl } from "../../config";
import useWebSocket, { ReadyState } from "react-use-websocket";

function Home() {
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const { stocks } = useSelector((state) => state.stocksReducer);
  const [stocksPrice, setStocksPrice] = useState([]);

  const [socketUrl, setSocketUrl] = useState(
    `${webSocketUrl}/api/v1/stocks/get-live-stocks`
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

  const getMarketCap = () => {
    if (stocks.length != 0) {
      console.log(stocks);
      let ticker = [];
      let marketCap = 0;
      let totalVol = 0;
      for (let i = 0; i < stocks.length; i++) {
        let s = stocks[i];
        marketCap += parseInt(s.volume) * parseFloat(s.currentPrice);
        totalVol += parseInt(s.volume);

        let colorTag = "green";
        let iconTag = "fa-solid fa-arrow-trend-up";

        let percentChange =
          ((parseFloat(s.currentPrice) - parseFloat(s.closePrice)) /
            parseFloat(s.currentPrice)) *
          100;
        if (percentChange < 0) {
          colorTag = "red";
          iconTag = "fa-solid fa-arrow-trend-down";
        }

        ticker.push({
          ...s,
          percentChange: percentChange,
          colorTag,
          iconTag,
        });
      }

      return (
        <Space className="mb-2" size="middle">
          {ticker.map((tick) => {
            console.log(tick);
            return (
              <Tag color={tick.colorTag}>
                {tick.stockName} {tick.tickerName}{" "}
                {tick.percentChange.toFixed(2)}% <i class={tick.iconTag}></i>
              </Tag>
            );
          })}
          <Tag color="green">Market Capitalization ${marketCap.toFixed(2)}</Tag>
          <Tag color="green"> Market Volume #{totalVol}</Tag>
        </Space>
      );
    } else {
      return null;
    }
  };
  return (
    <DefaultLayout>
      {loading == true && <Spinner />}

      <Row gutter={[16, 8]} className="mt-3">
        <marquee scrollamount={5}> {getMarketCap()} </marquee>
        <Col lg={24}>
          <h4>Stocks</h4>

          <div className="mt-1 mr-3 d-flex justify-content-between flex-row flex-wrap">
            {stocks.map((stock) => {
              return (
                <Col lg={12} className="mb-2 mt-2">
                  <div className="p-2 bs1">
                    <div className=" d-flex align-items-center justify-content-around">
                      <div className="text-left pl-2">
                        <div className="d-flex justify-content-between align-items-center align-content-center ">
                          <h5>{stock.stockName}</h5>
                          <Tag color="orange">{stock.tickerName}</Tag>
                        </div>
                        <div className="d-flex justify-content-between align-items-center align-content-center ">
                          <h6>Live Price</h6>
                          <Tag color="green">
                            {"$" + parseFloat(stock.currentPrice).toFixed(2)}
                          </Tag>
                        </div>

                        <div className="d-flex justify-content-between align-items-center align-content-center ">
                          <h6>Volume</h6>
                          <Tag color="blue">
                            {parseFloat(stock.volume).toFixed(0)}
                          </Tag>
                        </div>

                        <div className="d-flex justify-content-between align-items-center align-content-center ">
                          <div>
                            Daily High &nbsp;
                            <Tag color="green">
                              {"$" + parseFloat(stock.dailyHigh).toFixed(2)}
                            </Tag>
                          </div>
                          <div>
                            Daily Low &nbsp;
                            <Tag color="red">
                              {"$" + parseFloat(stock.dailyLow).toFixed(2)}
                            </Tag>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-around flex-column">
                        <button className="btn1-green mt-2">
                          <Link to={`/add-buy-orders/`}>BUY</Link>
                        </button>
                        <button className="btn1-red mt-2 ">
                          <Link to={`/add-sell-orders/`}>SELL</Link>
                        </button>
                        <div className="d-flex justify-content-between align-items-center align-content-center mt-3">
                          <div>
                            OPEN &nbsp;
                            <Tag color="blue">
                              {"$" + parseFloat(stock.openPrice).toFixed(2)}
                            </Tag>
                          </div>
                          <div>
                            CLOSE &nbsp;
                            <Tag color="blue">
                              {"$" + parseFloat(stock.closePrice).toFixed(2)}
                            </Tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Home;
