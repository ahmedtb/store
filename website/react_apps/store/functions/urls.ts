import axios from 'axios';
import { identity } from 'lodash';




const routesPrefix = ''
export const routes = {
    loginPage: () => routesPrefix + '/loginPage',
    home: () => routesPrefix,
    productShow: (id?: number) => id ? (routesPrefix + '/productShow/' + id) : routesPrefix + '/productShow/:id',

    notifications: () => routesPrefix + '/notifications',
}

const apiPrefix = '/api'
export const api = {
    currentLanguage: () => axios.get('/currentLanguage'),
    getUser: () => axios.get(apiPrefix + '/user'),
    logout: () => axios.get(apiPrefix + '/logout'),
    login: (username: string, password: string) => axios.get(apiPrefix + '/login', { params: { username: username, password: password } }),

    productsIndex: (params?) => axios.get(apiPrefix + '/productsIndex/', { params: params }),
    productShow: (id: number) => axios.get(apiPrefix + '/productShow/' + id),
    productImage: (id: number) => apiPrefix + '/productImage/' + id,

}
