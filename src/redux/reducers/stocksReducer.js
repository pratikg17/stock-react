const initialData = {
  stocks: [],
};

export const stocksReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_STOCKS":
      console.log("REDUCER CALLED", action.payload);
      return {
        ...state,
        stocks: action.payload,
      };
    default:
      return state;
  }
};
