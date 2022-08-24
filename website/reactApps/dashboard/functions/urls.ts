import axios from 'axios';




const routesPrefix = '/dashboard'
export const routes = {
    home: () => routesPrefix,
    loginPage: () => routesPrefix + '/loginPage',
    notifications: () => routesPrefix + '/notifications',

    productShow: (id?: number) => id ? (routesPrefix + '/productShow/' + id) : routesPrefix + '/productShow/:id',
    productsIndex: () => routesPrefix + '/productsIndex/',
    createProduct: () => routesPrefix + '/createProduct/',

    
    orderShow: (id?: number) => id ? (routesPrefix + '/orderShow/' + id) : routesPrefix + '/orderShow/:id',
    ordersIndex: () => routesPrefix + '/ordersIndex/',
    orderCreate: () => routesPrefix + '/orderCreate/',
        
    orderItemShow: (id?: number) => id ? (routesPrefix + '/orderItemShow/' + id) : routesPrefix + '/orderItemShow/:id',
    orderItemsIndex: () => routesPrefix + '/orderItemsIndex/',
    orderItemCreate: () => routesPrefix + '/orderItemCreate/',
            
    brandShow: (id?: number) => id ? (routesPrefix + '/brandShow/' + id) : routesPrefix + '/brandShow/:id',
    brandsIndex: () => routesPrefix + '/brandsIndex/',
    brandCreate: () => routesPrefix + '/brandCreate/',
                
    userShow: (id?: number) => id ? (routesPrefix + '/userShow/' + id) : routesPrefix + '/userShow/:id',
    usersIndex: () => routesPrefix + '/usersIndex/',
    userCreate: () => routesPrefix + '/userCreate/',
                   
    adminShow: (id?: number) => id ? (routesPrefix + '/adminShow/' + id) : routesPrefix + '/adminShow/:id',
    adminsIndex: () => routesPrefix + '/adminsIndex/',
    adminCreate: () => routesPrefix + '/adminCreate/',
                       
    categoryShow: (id?: number) => id ? (routesPrefix + '/categoryShow/' + id) : routesPrefix + '/categoryShow/:id',
    categoriesIndex: () => routesPrefix + '/categoriesIndex/',
    categoryCreate: () => routesPrefix + '/categoryCreate/',
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

    orderShow: (id: number) => axios.get(apiPrefix + '/orderShow/' + id),
    ordersIndex: (params) => axios.get(apiPrefix + '/ordersIndex/', { params: params }),
    orderCreate: (params) => axios.post(apiPrefix + '/orderCreate/', params),
    editOrder: (id: number, params: object) => axios.put(apiPrefix + 'editOrder/' + id, params),
    orderDelete: (id: number) => axios.delete(apiPrefix + '/orderDelete/' + id),

    
    orderItemShow: (id: number) => axios.get(apiPrefix + '/orderItemShow/' + id),
    orderItemsIndex: (params) => axios.get(apiPrefix + '/orderItemsIndex/', { params: params }),
    orderItemCreate: (params) => axios.post(apiPrefix + '/orderItemCreate/', params),
    orderItemEdit: (id: number, params: object) => axios.put(apiPrefix + 'orderItemEdit/' + id, params),
    orderItemDelete: (id: number) => axios.delete(apiPrefix + '/orderItemDelete/' + id),

    userShow: (id: number) => axios.get(apiPrefix + '/userShow/' + id),
    usersIndex: (params) => axios.get(apiPrefix + '/usersIndex/', { params: params }),
    userCreate: (params) => axios.post(apiPrefix + '/userCreate/', params),
    userEdit: (id: number, params: object) => axios.put(apiPrefix + 'userEdit/' + id, params),
    userDelete: (id: number) => axios.delete(apiPrefix + '/userDelete/' + id),

    brandShow: (id: number) => axios.get(apiPrefix + '/brandShow/' + id),
    brandsIndex: (params) => axios.get(apiPrefix + '/brandsIndex/', { params: params }),
    brandCreate: (params) => axios.post(apiPrefix + '/brandCreate/', params),
    brandEdit: (id: number, params: object) => axios.put(apiPrefix + 'brandEdit/' + id, params),
    brandDelete: (id: number) => axios.delete(apiPrefix + '/brandDelete/' + id),
    brandImage: (id: number) => apiPrefix + '/brandImage/' + id,

    adminShow: (id: number) => axios.get(apiPrefix + '/adminShow/' + id),
    adminsIndex: (params) => axios.get(apiPrefix + '/adminsIndex/', { params: params }),
    adminCreate: (params) => axios.post(apiPrefix + '/adminCreate/', params),
    adminEdit: (id: number, params: object) => axios.put(apiPrefix + 'adminEdit/' + id, params),
    adminDelete: (id: number) => axios.delete(apiPrefix + '/adminDelete/' + id),

    
    categoryShow: (id: number) => axios.get(apiPrefix + '/categoryShow/' + id),
    categoriesIndex: (params) => axios.get(apiPrefix + '/categoriesIndex/', { params: params }),
    categoryCreate: (params) => axios.post(apiPrefix + '/categoryCreate/', params),
    categoryEdit: (id: number, params: object) => axios.put(apiPrefix + 'categoryEdit/' + id, params),
    categoryDelete: (id: number) => axios.delete(apiPrefix + '/categoryDelete/' + id),
}
