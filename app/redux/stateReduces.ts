import { combineReducers } from 'redux';

const INITIAL_STATE : storeState = {
    notification: null,
    categories: [],
    user: null,
    expoPushToken: null,
    token: null,
    cart: null,
    GPS: null
};

const stateReducer = (state: storeState = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'setUserNotification':
            return { ...state, notification: action.notification };
        case 'setExpoPushToken':
            // console.log('state reducer expo token', action)
            return { ...state, expoPushToken: action.expoPushToken };
        case 'setCategories':
            return { ...state, categories: action.categories };

        case 'setUser':
            return { ...state, user: action.user };
        case 'setToken':
            return { ...state, token: action.token };
        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});