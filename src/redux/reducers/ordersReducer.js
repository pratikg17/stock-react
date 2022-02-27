const initialData = {
  orders: [],
};

export const ordersReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_USER_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
