const initialState = {
    complaints: []
};

const complaintReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COMPLAINT':
            return {
                ...state,
                complaints: [...state.complaints, action.payload]
            };

        default:
            return state;
    }
};

export default complaintReducer;
