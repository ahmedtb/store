import axios from 'axios';




const routesPrefix = '/'
export const routes = {
    dashboard: () => routesPrefix,

}

const apiPrefix = '/api'
export const api = {
    currentLanguage: () => axios.get('/currentLanguage'),
    getUser: () => axios.get(apiPrefix + '/user'),
    logout: () => axios.get(apiPrefix + '/logout'),
}
