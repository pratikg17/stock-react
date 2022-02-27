import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";
import { editStock, getAllStocks } from "../../redux/actions/stocksActions";
function EditStock({ match }) {
  const { stocks } = useSelector((state) => state.stocksReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [stock, setStock] = useState();
  const [totalStocks, setTotalStocks] = useState([]);
  useEffect(() => {
    if (stocks.length == 0) {
      dispatch(getAllStocks());
    } else {
      setTotalStocks(stocks);
      console.log(match.params);
      setStock(stocks.find((o) => o.stockId == match.params.stockid));
      console.log(stock);
    }
  }, [stocks]);

  function onFinish(values) {
    values.stockId = stock.stockId;
    dispatch(editStock(values));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalStocks.length > 0 && (
            <Form
              initialValues={stock}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Stock</h3>
              <hr />
              <Form.Item
                name="stockName"
                label="Stock Name"
                rules={[{ required: true, message: "Please input stock name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tickerName"
                label="Ticker Name"
                rules={[
                  { required: true, message: "Please input ticker name" },
                ]}
              >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item
                name="volume"
                label="Volume (No. of share)"
                rules={[{ required: true, message: "Please input the volume" }]}
              >
                <Input type="number" addonAfter="#" />
              </Form.Item>
              <Form.Item
                name="initialPrice"
                label="Listing Price"
                rules={[
                  { required: true, message: "Please input the listing price" },
                ]}
              >
                <Input type="number" addonAfter="$" />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">EDIT STOCK</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditStock;
