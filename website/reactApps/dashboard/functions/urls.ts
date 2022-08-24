import axios from 'axios';




const routesPrefix = '/dashboard'
export const routes = {
    loginPage: () => routesPrefix + '/loginPage',
    home: () => routesPrefix,
    notifications: () => routesPrefix + '/notifications',

    productShow: (id?: number) => id ? (routesPrefix + '/productShow/' + id) : routesPrefix + '/productShow/:id',
    productsIndex: () => routesPrefix + '/productsIndex/',
    createProduct: () => routesPrefix + '/createProduct/',
}

const apiPrefix = '/dashboardApi'
export const api = {
    currentLanguage: () => axios.get('/currentLanguage'),
    getUser: () => axios.get(apiPrefix + '/user'),
    logout: () => axios.get(apiPrefix + '/logout'),
    login: (username: string, password: string) => axios.get(apiPrefix + '/login', { params: { username: username, password: password } }),

    productShow: (id: number) => axios.get(apiPrefix + '/productShow/' + id),
    productsIndex: (params) => axios.get(apiPrefix + '/productsIndex/', { params: params }),
    createProduct: (params) => axios.post(apiPrefix + '/createProduct/', params),
    editProduct: (id: number, params: object) => axios.put(apiPrefix + '/editProduct/' + id, params),
    productDelete: (id: number) => axios.delete(apiPrefix + '/productDelete/' + id),
    productImage: (id: number) => apiPrefix + '/productImage/' + id,

    categoryShow: (id: number) => axios.get(apiPrefix + '/categoryShow/' + id),
    categoriesIndex: (params) => axios.get(apiPrefix + '/categoriesIndex/', { params: params }),
    createCategory: (params) => axios.post(apiPrefix + '/createCategory/', params),
    editCategory: (id: number, params: object) => axios.put(apiPrefix + '/editCategory/' + id, params),
}
