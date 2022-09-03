import { routes } from './urls'
import roles from './roles'
import LoginPage from '../LoginPage'
import ProductsIndex from '../product/ProductsIndex'
import ProductShow from '../product/ProductShow';
import ProductCreate from '../product/ProductCreate';
import BrandShow from '../brand/BrandShow';
import BrandsIndex from '../brand/BrandsIndex';
import BrandCreate from '../brand/BrandCreate';
import UserCreate from '../user/UserCreate';
import UsersIndex from '../user/UsersIndex';
import UserShow from '../user/UserShow';
import Home from '../Home';
import CategoriesIndex from '../category/CategoriesIndex';
import CategoryShow from '../category/CategoryShow';
import CategoryCreate from '../category/CategoryCreate';
import OrderCreate from '../order/OrderCreate';
import OrdersIndex from '../order/OrdersIndex';
import OrderShow from '../order/OrderShow';
import OrderItemCreate from '../orderItem/OrderItemCreate';
import OrderItemsIndex from '../orderItem/OrderItemsIndex';
import OrderItemShow from '../orderItem/OrderItemShow';
import AdminsIndex from '../admin/AdminsIndex';
import AdminShow from '../admin/AdminShow';
import AdminCreate from '../admin/AdminCreate';
import OrderedOrdersIndex from '../order/OrderedOrdersIndex';
import CartsIndex from '../order/CartsIndex';
import Notifications from '../notification/Notifications';

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
            roles.super
        ],
    },

    {
        component: ProductsIndex,
        path: routes.productsIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: ProductShow,
        path: routes.productShow(),
        permissions: [
            roles.super
        ],
    },
    {
        component: ProductCreate,
        path: routes.createProduct(),
        permissions: [
            roles.super
        ],
    },

    
    {
        component: BrandsIndex,
        path: routes.brandsIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: BrandShow,
        path: routes.brandShow(),
        permissions: [
            roles.super
        ],
    },
    {
        component: BrandCreate,
        path: routes.brandCreate(),
        permissions: [
            roles.super
        ],
    },

    {
        component: UsersIndex,
        path: routes.usersIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: UserShow,
        path: routes.userShow(),
        permissions: [
            roles.super
        ],
    },
    {
        component: UserCreate,
        path: routes.userCreate(),
        permissions: [
            roles.super
        ],
    },
    
    {
        component: CategoriesIndex,
        path: routes.categoriesIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: CategoryShow,
        path: routes.categoryShow(),
        permissions: [
            roles.super
        ],
    },
    {
        component: CategoryCreate,
        path: routes.categoryCreate(),
        permissions: [
            roles.super
        ],
    },

    {
        component: OrdersIndex,
        path: routes.ordersIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: OrderedOrdersIndex,
        path: routes.orderedOrdersIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: CartsIndex,
        path: routes.cartsIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: OrderShow,
        path: routes.orderShow(),
        permissions: [
            roles.super
        ],
    },
    {
        component: OrderCreate,
        path: routes.orderCreate(),
        permissions: [
            roles.super
        ],
    },
    
    {
        component: OrderItemsIndex,
        path: routes.orderItemsIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: OrderItemShow,
        path: routes.orderItemShow(),
        permissions: [
            roles.super
        ],
    },
    {
        component: OrderItemCreate,
        path: routes.orderItemCreate(),
        permissions: [
            roles.super
        ],
    },
    
    {
        component: AdminsIndex,
        path: routes.adminsIndex(),
        permissions: [
            roles.super
        ],
    },
    {
        component: AdminShow,
        path: routes.adminShow(),
        permissions: [
            roles.super
        ],
    },
    {
        component: AdminCreate,
        path: routes.adminCreate(),
        permissions: [
            roles.super
        ],
    },
    
    {
        component: Notifications,
        path: routes.notifications(),
        permissions: [
            roles.super
        ],
    },
]

export default configs