import React, { useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/actions/carsActions";
import { Button, Row, Col } from "antd";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

function Home() {
  // const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllCars());
  }, []);

  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Dashboard</h3>
            <button className="btn1">
              <Link to={`/wallet`}>Add Stocks</Link>
            </button>
          </div>
        </Col>
        <Col lg={20} sm={24}>
          <h1>Content</h1>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Home;
