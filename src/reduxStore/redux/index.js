import ActionType from  '../action/ActionType';

const initState = {
    selectedBook: ''
};


const reducer = (state = initState, action) => {

    switch(action.type) {
        case ActionType.SELECT_BOOK:
            return Object.assign({}, state, action);
        default:
            return state;
    }
};


export default reducer;