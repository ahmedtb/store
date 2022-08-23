import axios from 'axios';
import { identity } from 'lodash';




const routesPrefix = '/'
export const routes = {
    loginPage: () => routesPrefix + 'loginPage',
    home: () => routesPrefix,
    phone: (id?: number) => id ? (routesPrefix + 'phone/' + id) : routesPrefix + 'phone/:id',
    notifications: () => routesPrefix + 'notifications',
}

const apiPrefix = '/api'
export const api = {
    currentLanguage: () => axios.get('/currentLanguage'),
    getUser: () => axios.get(apiPrefix + '/user'),
    logout: () => axios.get(apiPrefix + '/logout'),
    login: (username: string, password: string) => axios.get(apiPrefix + '/login', { params: { username: username, password: password } }),
}
