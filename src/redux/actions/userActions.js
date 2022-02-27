import axios from "axios";
import { message } from "antd";
import jwt from "jwt-decode";
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/v1/users/investor-login", reqObj);

    const jwtToken = response.data.token;
    const decodedJwt = jwt(jwtToken);

    localStorage.setItem("token", jwtToken);

    localStorage.setItem("user", JSON.stringify(decodedJwt));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const adminLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/v1/users/admin-login", reqObj);

    const jwtToken = response.data.token;
    const decodedJwt = jwt(jwtToken);

    localStorage.setItem("token", jwtToken);

    localStorage.setItem("user", JSON.stringify(decodedJwt));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/admin-home";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/v1/users/", reqObj);
    message.success("Registration Sucessfull");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: true });
  }
};

export const getUserBalance = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });
  try {
    let reqObj = {
      userId: user,
    };
    console.log(reqObj);
    const response = await axios.post(
      "/api/v1/users/get-investor-balance",
      reqObj,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
      }
    );
    console.log(response);
    dispatch({ type: "GET_USER_BALANCE", payload: response.data.balance });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: true });
  }
};

export const getUserWalletHistory = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });
  try {
    let reqObj = {
      userId: user,
    };
    console.log(reqObj);
    const response = await axios.post(
      "/api/v1/users/get-investor-wallet-transaction",
      reqObj,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
      }
    );
    dispatch({ type: "GET_WALLET_TXN", payload: response.data.transaction });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: true });
  }
};

export const addInvestorFunds = (data) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;
  dispatch({ type: "LOADING", payload: true });
  try {
    let reqObj = {
      ...data,
      userId: user,
    };
    console.log(reqObj);
    const response = await axios.post(
      "/api/v1/users/add-investor-funds",
      reqObj,
      {
        headers: {
          Authorization: token, //the token is a variable which holds the token
        },
      }
    );
    message.success("Funds added  successfully");
    setTimeout(() => {
      window.location.href = "/wallet";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: true });
  }
};
