import {combineReducers} from "redux";
import agendaReducer from "./reducer";
const rootReducer = combineReducers({
    data: agendaReducer
});
export default rootReducer;