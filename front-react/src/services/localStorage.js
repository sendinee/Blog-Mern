
export const USERDATA= "USERDATA";
export const TOKENID= "TOKENID";

export const storeData = (key, data) => {
    localStorage.setItem(key, data);
};

export const retrieveData = (key) => {
    return localStorage.getItem(key);
};

export const removeData = (key) => {
    return localStorage.removeItem(key);
};