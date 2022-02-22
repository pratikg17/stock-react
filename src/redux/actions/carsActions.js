import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/v1/stocks/get-all-stocks", {
      headers: {
        Authorization: token, //the token is a variable which holds the token
      },
    });
    dispatch({ type: "GET_ALL_STOCKS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {}
};
