import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Col, Row, Form, Input, Select, DatePicker } from "antd";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllStocks } from "../../redux/actions/stocksActions";

function AddBuyOrders(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { stocks } = useSelector((state) => state.stocksReducer);
  const [totalStocks, setTotalStocks] = useState([]);
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);

  const [form] = Form.useForm();
  function onFinish(values) {
    // dispatch(addStock(values));
  }
  useEffect(() => {
    setTotalStocks(stocks);
  }, [stocks]);

  useEffect(() => {
    dispatch(getAllStocks());
  }, []);
  function handleStockChange(value) {
    const selectedStock = stocks.find((stock) => {
      return stock.stockId == value;
    });

    form.setFieldsValue({
      amount: selectedStock.currentPrice,
    });
  }

  function handleOrderTypeChange(value) {
    console.log(`selected ${value}`);
  }

  function handleTradeTypeChange(value) {
    console.log(`selected ${value}`);
  }

  function onExpiryDateChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form
            form={form}
            className="bs1 p-2"
            layout="vertical"
            onFinish={onFinish}
          >
            <h3>Add New Order</h3>
            <hr />

            <Form.Item
              name="orderType"
              label="Order Type"
              rules={[{ required: true, message: "Please select order type" }]}
            >
              <Select
                style={{ float: "right" }}
                title
                onChange={handleOrderTypeChange}
                defaultValue="BUY"
              >
                <Select.Option value="BUY">BUY</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="tradeType"
              label="Trade Type"
              rules={[{ required: true, message: "Please select trade type" }]}
            >
              <Select
                style={{ float: "right" }}
                title
                defaultValue="MARKET"
                onChange={handleTradeTypeChange}
              >
                <Select.Option value="MARKET">MARKET</Select.Option>
                <Select.Option value="LIMIT">LIMIT</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="stockName"
              label="Stock"
              rules={[{ required: true, message: "Please select Stock" }]}
            >
              <Select
                style={{ float: "right" }}
                title
                onChange={handleStockChange}
              >
                {stocks.map((stock) => {
                  return (
                    <Select.Option value={stock.stockId}>
                      {`${stock.tickerName} (${stock.stockName}) $${stock.currentPrice}`}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Price"
              setValue={selectedStockPrice}
              rules={[{ required: true, message: "Please input stock price" }]}
            >
              <Input type="number" addonAfter="$" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity (No. of share)"
              rules={[{ required: true, message: "Please input the Quantity" }]}
            >
              <Input type="number" addonAfter="#" />
            </Form.Item>

            <Form.Item
              name="expiryDate"
              label="Order Expiry Date"
              rules={[
                { required: true, message: "Please input the listing price" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                defaultValue={moment()}
                disabledDate={(current) => {
                  return (
                    moment().add(-1, "days") >= current ||
                    moment().add(1, "month") <= current
                  );
                }}
                onChange={onExpiryDateChange}
              />
            </Form.Item>

            <div className="text-right">
              <button className="btn1">ADD BUY ORDER</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddBuyOrders;
