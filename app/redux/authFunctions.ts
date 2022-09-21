import { getValueFor, deleteItem, saveItem } from "./SecureStoreFunctions"
import axios from 'axios'
import store from './store'
import { setUser, setToken } from "./stateActions";
import { logError, api } from "../urls";


export function loginProcedure(phoneNumber: string, password: string) {
    const storeState = store.getState();
    // console.log('state', state)
    if (storeState.state.expoPushToken)
        api.appLogin(phoneNumber, password, storeState.state.expoPushToken)
            .then((response) => {
                console.log('loginProcedure token', response.data.token)
                storeTokenRecord(response.data.token)
                setUserAndAxiosToken(response.data.user, response.data.token)
            })
            .catch(error => logError(error, 'authfunction loginProcedure'))
    else {
        console.log('loginProcedure', 'there is no expo push token to use')
    }
}

export function tryLoginUserFromStore() {
    getTokenFromStorage().then((token) => {
        api.appGetUser(token)
            .then((response) => setUserAndAxiosToken(response.data, token))
            .catch(error => {
                logError(error, 'tryLoginUserFromStore getUser')
                setUserAndAxiosToken(null, null)
                console.log('AuthenticationStack', 'user is in the store but is not validated')
            })
    }).catch(error => logError(error, 'tryLoginUserFromStore getTokenFromStorage'))
}

export function logoutProcedure() {
    const storeState = store.getState();
    api.appLogout(storeState.state.token).then((response) => {
        console.log('logoutProcedure', response)
        deleteTokenRecord()
        setUserAndAxiosToken(null, null)
        // store.dispatch(setProvider(null))
    }).catch((error) => logError(error, 'logoutProcedure'))
}



// export function fetchUser(token: string) {

//     api.appGetUser(token).then((response) => {
//         console.log('fetchUser response', response)
//         store.dispatch(setUser(response.data))
//     }).catch((error) => {
//         logError(error, 'fetchUser')
//     })
// }

export async function getTokenFromStorage() {
    const storedResult = await getValueFor('token')
    if (storedResult) {
        return JSON.parse(storedResult)
    } else {
        throw new Error('token does not in exist in Secure Store')
    }
}

export function setUserAndAxiosToken(user: user, token: string) {
    if (user && token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        store.dispatch(setUser(user))
        store.dispatch(setToken(token))
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        store.dispatch(setUser(null))
        store.dispatch(setToken(null))
    }

}

export async function storeTokenRecord(token: string) {
    saveItem('token', JSON.stringify(token))
}

export async function deleteTokenRecord() {
    deleteItem('token')
}