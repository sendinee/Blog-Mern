import { storeData, removeData, USERDATA, TOKENID } from "../../services/localStorage";

export const onConnect = (user, token) => {
    return dispatch => {
        storeData(USERDATA, JSON.stringify(user));
        storeData(TOKENID, token);
        dispatch({
            type: "SET_USERDATA",
            value: user
        });
    }
};

export const disconnect = () => {
    removeData(USERDATA);
    removeData(TOKENID);
    return dispatch => {
        dispatch({
            type: "SET_USERDATA",
            value: null
        });
    }
};