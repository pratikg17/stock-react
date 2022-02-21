import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { Row, Col, Divider } from "antd";

function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
    if (cars.length > 0) {
      setCar(cars.find((o) => o._id == match.params.carid));
    }
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="carimg2 bs1"></img>
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /-</p>
            <p>{car.rentPerHour} Rent Per Hour /-</p>
            <p>Fuel: {car.fuelType}</p>
            <p>Max Person: {car.capacity}</p>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
