import { routes } from './urls'
import roles from './roles'
import LoginPage from '../user/LoginPage'
import Home from '../Home'
import ProductShow from '../ProductShow'
import CartItems from '../cart/CartItems'
import ProductsFiltering from '../ProductsFiltering';
import MyOrders from '../order/MyOrders'
import Notifications from '../notification/Notifications'

const configs: routeConfigsType = [
    {
        component: LoginPage,
        path: routes.loginPage(),
        permissions: [
        ],
    },

    {
        component: Home,
        path: routes.home(),
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
        component: CartItems,
        path: routes.cartItems(),
        permissions: [
            roles.customer
        ],
    },
    
    {
        component: ProductsFiltering,
        path: routes.productsFiltering(),
        permissions: [
            
        ],
    },
    
    {
        component: MyOrders,
        path: routes.myOrders(),
        permissions: [
            roles.customer
            
        ],
    },
    
    {
        component: Notifications,
        path: routes.notifications(),
        permissions: [
            roles.customer
            
        ],
    }

    
]

export default configs