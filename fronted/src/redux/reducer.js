import * as types from "./actionType";

const initialState = {
    agendas: [],
    agenda: {},
    msg: ""
}

const agendaReducer = (state = initialState, action) => {
    switch(action.type) {
        case  types.GET_AGENDAS:
            return {
                ...state,
                agendas: action.payload,
            }
        case types.ADD_AGENDA:
        case types.DELETE_AGENDA:
            return{
                ...state,
                msg: action.payload,
            }
        case types.GET_SINGLE_AGENDA:
            return{
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
};

export default agendaReducer;