import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { jwtDecode } from "jwt-decode";
const initialState = {};

const token = localStorage.getItem("access");
if (token) {
  const decoded = jwtDecode(token);
  const userID = decoded.user_id;
} else {
  const userID = null;
}
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
