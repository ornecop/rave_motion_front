// Actions

// Initial State
import initialState from "./initialState";

// Root reducer
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return { ...state };
    }
};

export default rootReducer;
