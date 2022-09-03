import { combineReducers } from 'redux';

const INITIAL_STATE: dashboardState = {
    admin: null,
    allowedRoutes: [],
    notification: null,
};

const stateReducer = (state = INITIAL_STATE, action: dashboardReduxAction) => {
    switch (action.type) {
        case 'refresh-admin':
            return {
                ...state,
                admin: action.admin,
            };
        case 'setAllowedRoutes':
            return {
                ...state,
                allowedRoutes: action.allowedRoutes,
                // allowedRoutes: calculateAllowedRoutes(action.admin)
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