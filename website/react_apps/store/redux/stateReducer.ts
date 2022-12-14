import { combineReducers } from 'redux';

const INITIAL_STATE: storeState = {
    user: null,
    allowedRoutes: [],
    notification: null,
    cart: null,
    GPS: null
};

const stateReducer = (state = INITIAL_STATE, action: action) => {
    switch (action.type) {
        case 'refresh-user':
            return {
                ...state,
                user: action.user,
            };
        case 'setAllowedRoutes':
            return {
                ...state,
                allowedRoutes: action.allowedRoutes,
                // allowedRoutes: calculateAllowedRoutes(action.user)
            };
        case 'refresh-notification':
            return {
                ...state,
                notification: action.notification,
            };
        case 'refresh-cart':
            return {
                ...state,
                cart: action.cart,
            };
        case 'setGPS':
            return {
                ...state,
                GPS: action.GPS,
            };


        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});