export const ALPHABETIC_ORDER = "ALPHABETIC_ORDER";
export const DATE_ORDER = "DATE_ORDER";

export const alphabeticOrder = (payload) => {
    return {
        type: ALPHABETIC_ORDER,
        payload,
    };
};

export const dateOrder = (payload) => {
    return { type: DATE_ORDER, payload };
};
