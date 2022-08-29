import axios from 'axios';
import { identity } from 'lodash';




const routesPrefix = ''
export const routes = {
    loginPage: () => routesPrefix + '/loginPage',
    home: () => routesPrefix,
    productShow: (id?: number) => id ? (routesPrefix + '/productShow/' + id) : routesPrefix + '/productShow/:id',

    notifications: () => routesPrefix + '/notifications',
    cartItems: () => routesPrefix + '/cartItems',
}

const apiPrefix = '/api'
export const api = {
    currentLanguage: () => axios.get('/currentLanguage'),
    getUser: () => axios.get(apiPrefix + '/user'),
    logout: () => axios.get(apiPrefix + '/logout'),
    login: (phone: string, password: string) => axios.post(apiPrefix + '/login', {  phone: phone, password: password }),

    productsIndex: (params?) => axios.get(apiPrefix + '/productsIndex/', { params: params }),
    productShow: (id: number) => axios.get(apiPrefix + '/productShow/' + id),
    productImage: (id: number) => apiPrefix + '/productImage/' + id,

    addToCart: (id: number, quantity: number) => axios.post(apiPrefix + '/addToCart', { product_id: id, quantity: quantity }),
    getCart: () => axios.get(apiPrefix + '/getCart'),
    cartToOrdered: () => axios.post(apiPrefix + '/cartToOrdered'),
}
