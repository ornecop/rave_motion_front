// ============= Events Actions Types
export const GLOBAL_ERROR_REMOVE = "GLOBAL_ERROR_REMOVE";

// ============= Events Actions Creators

export const removeGlobalError = () => {
    return {
        type: GLOBAL_ERROR_REMOVE,
    };
};
