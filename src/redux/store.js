import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { stocksReducer } from "./reducers/stocksReducer";
import { alertsReducer } from "./reducers/alertsReducer";
import { userReducer } from "./reducers/userReducer";
import { ordersReducer } from "./reducers/ordersReducer";
import { adminReducer } from "./reducers/adminReducer";

// Actions - call api
// Reducers - save the data

const composeEnhancers = composeWithDevTools({});

const rootReducers = combineReducers({
  alertsReducer,
  stocksReducer,
  userReducer,
  ordersReducer,
  adminReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
