import {combineReducers} from "redux";
import houses from "./houses";
import character from "./character";
import {connectRouter} from "connected-react-router";
import history from "../history";

export default combineReducers({houses, character, router: connectRouter(history)});
