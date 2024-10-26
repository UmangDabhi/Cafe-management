import { combineReducers } from "redux";
import tablesReducer from "./slices/tablesSlice";
import menuReducer from "./slices/menuSlice";

// Combine reducers into one root reducer
const rootReducer = combineReducers({
  menu: menuReducer, 
  tables: tablesReducer,
});

export default rootReducer;
