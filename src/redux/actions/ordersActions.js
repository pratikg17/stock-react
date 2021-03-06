import { message } from "antd";
import axios from "axios";
import { baseUrl } from "../../config";
export const getAllOrdersByUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/orders/get-all-user-orders`,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
        params: { user_id: user },
      }
    );
    console.log(response);
    dispatch({ type: "GET_ALL_USER_ORDERS", payload: response.data.orders });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

export const getAllTradesByUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/orders/get-all-user-trades`,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
        params: { user_id: user },
      }
    );
    console.log("TRADES", response);
    dispatch({ type: "GET_ALL_USER_TRADES", payload: response.data.trades });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

export const getUserPortfolio = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/orders/get-user-portfolio`,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
        params: { user_id: user },
      }
    );
    dispatch({ type: "GET_PORTFOLIO", payload: response.data.trades });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post(
      `${baseUrl}/api/v1/orders/delete-order`,
      {
        orderId: orderId,
      },
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
      }
    );

    dispatch({ type: "LOADING", payload: false });
    dispatch(getAllOrdersByUser());
    message.success("Order cancelled successfully");
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addBuyOrderStock = (order) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });
  let reqObj = { ...order, userId: userId };
  try {
    await axios.post(`${baseUrl}/api/v1/orders/place-buy-order`, reqObj, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("New Order added successfully");
    setTimeout(() => {
      window.location.href = "/orders";
    }, 500);
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addSellOrderStock = (order) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });
  let reqObj = { ...order, userId: userId };
  try {
    await axios.post(`${baseUrl}/api/v1/orders/place-sell-order`, reqObj, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("New Order added successfully");
    setTimeout(() => {
      window.location.href = "/orders";
    }, 500);
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};
