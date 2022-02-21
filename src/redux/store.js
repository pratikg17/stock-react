import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { carsReducer } from "./reducers/carsReducer";
import { alertsReducer } from "./reducers/alertsReducer";

// Actions - call api
// Reducers - save the data

const composeEnhancers = composeWithDevTools({});

const rootReducers = combineReducers({ carsReducer, alertsReducer });

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
