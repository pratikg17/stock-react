const initialData = {
  orders: [],
  portfolio: [],
};

export const ordersReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_USER_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "GET_PORTFOLIO":
      return {
        ...state,
        portfolio: action.payload,
      };
    case "CANCEL_ORDER":
      return {
        ...state,
      };
    default:
      return state;
  }
};
