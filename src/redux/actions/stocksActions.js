import { message } from "antd";
import axios from "axios";
import { baseUrl } from "../../config";

export const getAllStocks = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/stocks/get-all-stocks`,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
      }
    );
    console.log(response);
    dispatch({ type: "GET_ALL_STOCKS", payload: response.data.stocks });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

export const addStock = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(`${baseUrl}/api/v1/stocks/`, reqObj, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("New stock added successfully");
    setTimeout(() => {
      window.location.href = "/admin-home";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editStock = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(`${baseUrl}/api/v1/stocks/update-stock`, reqObj, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("New stock added successfully");
    setTimeout(() => {
      window.location.href = "/admin-home";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
