const SUCCESS = "SUCCESS";
const CLEAR = "CLEAR";

export const actionCreator = {
    success: (type, payload) => action(type.SUCCESS, { payload }),
    clear: (type) => action(type.CLEAR),
};

export const createRequestTypes = (base) => {
    return [SUCCESS, CLEAR].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
};

export const action = (type, payload = {}) => {
    return { type, ...payload };
};