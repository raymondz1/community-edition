import { combineReducers } from "../utils/reducerUtils";
import { formReducer } from "./formReducer";
import { uiReducer } from "./uiReducer";



export default combineReducers({
    data: formReducer,
    ui: uiReducer
});