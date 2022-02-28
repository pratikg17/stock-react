const initialData = {
  marketHours: {},
};

export const adminReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_MARKET_HOURS":
      return {
        ...state,
        marketHours: action.payload,
      };
    default:
      return state;
  }
};
