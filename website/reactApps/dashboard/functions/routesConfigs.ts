import { routes } from './urls'
import roles from './roles'
import LoginPage from '../LoginPage'
import ProductsIndex from '../product/ProductsIndex'
import ProductShow from '../product/ProductShow';
import ProductCreate from '../product/ProductCreate';


const configs: routeConfigsType = [
    {
        component: LoginPage,
        path: routes.loginPage(),
        permissions: [
        ],
    },
    {
        component: ProductsIndex,
        path: routes.loginPage(),
        permissions: [
        ],
    },
    {
        component: ProductShow,
        path: routes.productShow(),
        permissions: [
        ],
    },
    {
        component: ProductCreate,
        path: routes.createProduct(),
        permissions: [
        ],
    },

]

export default configs