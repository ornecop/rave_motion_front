// ============= Events Actions Types
export const GLOBAL_ERROR_SET = "GLOBAL_ERROR_SET";
export const GLOBAL_ERROR_REMOVE = "GLOBAL_ERROR_REMOVE";

export const GLOBAL_SUCCESS_SET = "GLOBAL_SUCCESS_SET";
export const GLOBAL_SUCCESS_REMOVE = "GLOBAL_SUCCESS_REMOVE";

// ============= Events Actions Creators

export const setGlobalError = (error) => {
    return {
        type: GLOBAL_ERROR_SET,
        payload: error,
    };
};

export const removeGlobalError = () => {
    return {
        type: GLOBAL_ERROR_REMOVE,
    };
};

export const setGlobalSuccess = (message) => {
    return {
        type: GLOBAL_SUCCESS_SET,
        payload: message,
    };
};

export const removeGlobalSuccess = () => {
    return {
        type: GLOBAL_SUCCESS_REMOVE,
    };
};
