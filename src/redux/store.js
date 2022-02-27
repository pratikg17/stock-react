import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { carsReducer } from "./reducers/carsReducer";
import { stocksReducer } from "./reducers/stocksReducer";
import { alertsReducer } from "./reducers/alertsReducer";
import { userReducer } from "./reducers/userReducer";
import { ordersReducer } from "./reducers/ordersReducer";

// Actions - call api
// Reducers - save the data

const composeEnhancers = composeWithDevTools({});

const rootReducers = combineReducers({
  carsReducer,
  alertsReducer,
  stocksReducer,
  userReducer,
  ordersReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
