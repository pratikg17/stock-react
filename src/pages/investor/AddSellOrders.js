import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Col, Row, Form, Input, Select, DatePicker } from "antd";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllStocks } from "../../redux/actions/stocksActions";
import {
  addSellOrderStock,
  getUserPortfolio,
} from "../../redux/actions/ordersActions";

function AddSellOrders(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { stocks } = useSelector((state) => state.stocksReducer);
  const { portfolio } = useSelector((state) => state.ordersReducer);
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);

  const [form] = Form.useForm();
  function onFinish(values) {
    let expiryDate = values.expiryDate.toISOString();
    let reqObj = {
      ...values,
      quantity: parseFloat(values.quantity),
      amount: parseFloat(values.amount),
      stockId: values.stockName,
      tradeType: "SELL",
      expiryDate,
    };

    dispatch(addSellOrderStock(reqObj));
  }

  useEffect(() => {
    dispatch(getUserPortfolio());
  }, []);
  function handleStockChange(value) {
    const selectedStock = portfolio.find((stock) => {
      return stock.stockId == value;
    });
    console.log("selectedStock", selectedStock);
    form.setFieldsValue({
      amount: selectedStock.currentPrice,
    });
    form.setFieldsValue({
      quantity: selectedStock.noOfStocks,
    });
  }

  function handleTradeTypeChange(value) {
    console.log(`selected ${value}`);
  }

  function handleOrderTypeChange(value) {
    console.log(`selected ${value}`);
  }

  function onExpiryDateChange(date, dateString) {
    console.log(date, dateString);

    form.setFieldsValue({
      expiryDate: date,
    });
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
            <h3>Add Sell Order</h3>
            <hr />

            <Form.Item
              name="tradeType"
              label="Trade Type"
              rules={[{ required: true, message: "Please select order type" }]}
            >
              <Select
                style={{ float: "right" }}
                title
                onChange={handleTradeTypeChange}
              >
                <Select.Option value="SELL">SELL</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="orderType"
              label="Order Type"
              rules={[{ required: true, message: "Please select trade type" }]}
            >
              <Select
                style={{ float: "right" }}
                title
                onChange={handleOrderTypeChange}
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
                {portfolio.map((stock) => {
                  return (
                    <Select.Option value={stock.stockId}>
                      {`${stock.tickerName} (${stock.stockName}) $${stock.currentPrice} #Qty ${stock.noOfStocks} `}
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
              rules={[{ required: true, message: "Please order expiry date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return moment().add(-1, "days") >= current;
                }}
                onChange={onExpiryDateChange}
              />
            </Form.Item>

            <div className="text-right">
              <button className="btn1">ADD SELL ORDER</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddSellOrders;
