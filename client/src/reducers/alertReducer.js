import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types';

const initialState = {
    alerts: null
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case SET_ALERT:
            return{
                alerts: [ action.payload]
            }
            case REMOVE_ALERT: 
            return{
                alerts: null
            }  
            default:
                return state;
    }
}