import { combineReducers } from "redux";
import employeeReducer from "./components/Employee/reducer";
import docReducer from "./components/Doc/reducer";
import positionReducer from "./components/Position/reducer";

export default combineReducers({
  employeeStore: employeeReducer,
  docStore: docReducer,
  positionStore: positionReducer
});
