const initialData = {
  walletBalance: 0,
  walletHistory: [],
};

export const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_USER_BALANCE":
      return {
        ...state,
        walletBalance: action.payload,
      };
    case "GET_WALLET_TXN":
      return {
        ...state,
        walletHistory: action.payload,
      };
    default:
      return state;
  }
};
