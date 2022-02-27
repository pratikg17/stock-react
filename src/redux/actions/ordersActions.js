import { message } from "antd";
import axios from "axios";

export const getAllOrdersByUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")).userId;

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/v1/orders/get-all-user-orders", {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
      params: { user_id: user },
    });
    console.log(response);
    dispatch({ type: "GET_ALL_USER_ORDERS", payload: response.data.orders });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    throw error;
  }
};

// export const addStock = (reqObj) => async (dispatch) => {
//   const token = localStorage.getItem("token");
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     await axios.post("/api/v1/stocks/", reqObj, {
//       headers: {
//         Authorization: token, //the token is a variable which holds the token
//       },
//     });

//     dispatch({ type: "LOADING", payload: false });
//     message.success("New stock added successfully");
//     setTimeout(() => {
//       window.location.href = "/admin-home";
//     }, 500);
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: "LOADING", payload: false });
//   }
// };

// export const editStock = (reqObj) => async (dispatch) => {
//   const token = localStorage.getItem("token");
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     await axios.post("/api/v1/stocks/update-stock", reqObj, {
//       headers: {
//         Authorization: token, //the token is a variable which holds the token
//       },
//     });

//     dispatch({ type: "LOADING", payload: false });
//     message.success("New stock added successfully");
//     setTimeout(() => {
//       window.location.href = "/admin-home";
//     }, 500);
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: "LOADING", payload: false });
//   }
// };
