import { retrieveData, USERDATA } from "../../services/localStorage";

let INITIAL_STATE = {
    data: (retrieveData(USERDATA)? retrieveData(USERDATA) : null),
};

let userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_USERDATA":
            return {...state, data: action.value};
        default:
            return state;
    }
};

export default userReducer;