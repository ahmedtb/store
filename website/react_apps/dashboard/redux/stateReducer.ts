import { combineReducers } from 'redux';

const INITIAL_STATE: dashboardState = {
    user: null,
    allowedRoutes: [],
    notification: null,
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



        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});