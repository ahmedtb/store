import axios from 'axios';
import _Environments from './env'

function getURLParams(url) {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params
}

const apiPrefix = '/api'
export const api = {
    currentLanguage: () => axios.get('/currentLanguage'),
    // getUser: () => axios.get(apiPrefix + '/user'),
    // logout: () => axios.delete(apiPrefix + '/logout'),
    // login: (phone: string, password: string) => axios.post(apiPrefix + '/login', { phone: phone, password: password }),
    // signUp: (params: object) => axios.post(apiPrefix + '/signUp', params),
    appLogin: (phone: string, password: string, expoPushToken: string) => axios.post(apiPrefix + '/appLogin', { phone: phone, password: password, expoPushToken: expoPushToken }),
    appGetUser: (token: string) => axios.get(apiPrefix + '/appGetUser/' + token),
    appLogout: (token: string) => axios.delete(apiPrefix + '/appLogout/' + token),


    productsIndex: (params?) => axios.get(apiPrefix + '/productsIndex/', { params: params }),
    productShow: (id: number) => axios.get(apiPrefix + '/productShow/' + id),
    productImage: (id: number) => _Environments.BASE_URL + apiPrefix + '/productImage/' + id,

    addToCart: (id: number, quantity: number) => axios.post(apiPrefix + '/addToCart', { product_id: id, quantity: quantity }),
    getCart: () => axios.get(apiPrefix + '/getCart'),
    cartToOrdered: (lat: number, long: number) => axios.post(apiPrefix + '/cartToOrdered', { long: long, lat: lat }),

    myOrders: (params?: object) => axios.get(apiPrefix + '/myOrders', { params: params }),
    orderShow: (id: number) => axios.get(apiPrefix + '/orderShow/' + id),
    orderDelete: (id: number) => axios.delete(apiPrefix + '/orderDelete/' + id),

    notificationsIndex: (params?: object) => axios.get(apiPrefix + '/notifications', { params: params }),
    markAsReaded: (id: number) => axios.post(apiPrefix + '/notification/' + id + '/markAsReaded'),

    categories: () => axios.get(apiPrefix + '/categories'),
    slides: () => axios.get(apiPrefix + '/slides'),
}

export function getPaginationParams(pagination: pagination<any>, next = false) {
    let params = {}
    if (pagination?.first_page_url && !next) {
        let url = pagination.first_page_url
        params = getURLParams(url)
    }
    if (pagination?.next_page_url && next) {
        let url = pagination.next_page_url
        params = getURLParams(url)
    }
    return params
}


import { AxiosResponse } from "axios"

export async function apiCallHandler(ApiEndpoint: () => Promise<AxiosResponse>, setData: (data: any | null) => void, Identifier: string | null, logData = false) {
    try {
        const response = await ApiEndpoint()
        if (setData)
            setData(response.data)
        if (Identifier && logData)
            console.log(Identifier + ':', response.data)
        return response
    } catch (error) {
        logError(error, Identifier)
        throw error
    }
}


export function logError(error, sourceName = null) {
    if (sourceName)
        console.log('error from: ', sourceName)
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.config);

    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    // alertError(error)
    console.log(error.stack)
}

export function alertError(error) {

    if (error?.response?.data?.errors) {
        let message = ''
        for (const property in error?.response?.data?.errors) {
            message += `${property}: ${error?.response?.data?.errors[property]}\n`
        }
        alert(message);
    } else if (error?.response?.status == 404) {
        alert(
            'exception: ' + error?.response?.data?.exception + '\n'
            + 'url: ' + error?.response?.config?.url
        )
    } else if (error?.response?.status == 401) {
        alert(
            'message: Unauthenticated \n'
            + 'url: ' + error?.response?.config?.url
        )
    } else if (error?.response?.status == 500) {
        alert(
            'message: ' + error.response?.data?.message + '\n'
            + 'url: ' + error?.response?.config?.url
        )
    }
}