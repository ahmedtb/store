import axios from 'axios';
import { identity } from 'lodash';




const routesPrefix = ''
export const routes = {
    loginPage: () => routesPrefix + '/loginPage',
    signUp: () => routesPrefix + '/signUp',

    home: () => '/',
    productShow: (id?: number) => id ? (routesPrefix + '/productShow/' + id) : routesPrefix + '/productShow/:id',

    notifications: () => routesPrefix + '/notifications',
    cartItems: () => routesPrefix + '/cartItems',
    productsFiltering: () => routesPrefix + '/productsFiltering',
    myOrders: () => routesPrefix + '/myOrders',

}

const apiPrefix = '/api'
export const api = {
    currentLanguage: () => axios.get('/currentLanguage'),
    getUser: () => axios.get(apiPrefix + '/user'),
    logout: () => axios.delete(apiPrefix + '/logout'),
    login: (phone: string, password: string) => axios.post(apiPrefix + '/login', { phone: phone, password: password }),
    signUp: (params: object) => axios.post(apiPrefix + '/signUp', params),

    productsIndex: (params?) => axios.get(apiPrefix + '/productsIndex/', { params: params }),
    productShow: (id: number) => axios.get(apiPrefix + '/productShow/' + id),
    productImage: (id: number) => apiPrefix + '/productImage/' + id,

    addToCart: (id: number, quantity: number) => axios.post(apiPrefix + '/addToCart', { product_id: id, quantity: quantity }),
    getCart: () => axios.get(apiPrefix + '/getCart'),
    cartToOrdered: (lat: number, long: number) => axios.post(apiPrefix + '/cartToOrdered', { long: long, lat: lat }),

    myOrders: (params?: object) => axios.get(apiPrefix + '/myOrders', { params: params }),
    orderShow: (id: number) => axios.get(apiPrefix + '/orderShow/' + id),
    orderDelete: (id: number) => axios.delete(apiPrefix + '/orderDelete/' + id),

    notificationsIndex: (params?: object) => axios.get(apiPrefix + '/notifications', { params: params }),
    categories: () => axios.get(apiPrefix + '/categories'),
    slides: () => axios.get(apiPrefix + '/slides'),
}
