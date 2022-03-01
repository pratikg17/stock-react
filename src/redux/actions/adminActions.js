import { message } from "antd";
import axios from "axios";
import { baseUrl } from "../../config";
export const getMarketHours = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/users/get-market-hours`,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
      }
    );

    dispatch({ type: "GET_MARKET_HOURS", payload: response.data.marketHours });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

export const saveMarketHours = (reqObj) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(`${baseUrl}/api/v1/users/save-market-hours`, reqObj, {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });

    dispatch({ type: "LOADING", payload: false });
    message.success("Market Hours changed successfully");
    setTimeout(() => {
      window.location.href = "/admin-home";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
