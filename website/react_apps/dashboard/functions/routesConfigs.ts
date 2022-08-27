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
        component: ProductsIndex,
        path: routes.productsIndex(),
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

    
    {
        component: BrandsIndex,
        path: routes.brandsIndex(),
        permissions: [
        ],
    },
    {
        component: BrandShow,
        path: routes.brandShow(),
        permissions: [
        ],
    },
    {
        component: BrandCreate,
        path: routes.brandCreate(),
        permissions: [
        ],
    },

    {
        component: UsersIndex,
        path: routes.usersIndex(),
        permissions: [
        ],
    },
    {
        component: UserShow,
        path: routes.userShow(),
        permissions: [
        ],
    },
    {
        component: UserCreate,
        path: routes.userCreate(),
        permissions: [
        ],
    },
    
    {
        component: CategoriesIndex,
        path: routes.categoriesIndex(),
        permissions: [
        ],
    },
    {
        component: CategoryShow,
        path: routes.categoryShow(),
        permissions: [
        ],
    },
    {
        component: CategoryCreate,
        path: routes.categoryCreate(),
        permissions: [
        ],
    },

    {
        component: OrdersIndex,
        path: routes.ordersIndex(),
        permissions: [
        ],
    },
    {
        component: OrderShow,
        path: routes.orderShow(),
        permissions: [
        ],
    },
    {
        component: OrderCreate,
        path: routes.orderCreate(),
        permissions: [
        ],
    },
    
    {
        component: OrderItemsIndex,
        path: routes.orderItemsIndex(),
        permissions: [
        ],
    },
    {
        component: OrderItemShow,
        path: routes.orderItemShow(),
        permissions: [
        ],
    },
    {
        component: OrderItemCreate,
        path: routes.orderItemCreate(),
        permissions: [
        ],
    },
    
    {
        component: AdminsIndex,
        path: routes.adminsIndex(),
        permissions: [
        ],
    },
    {
        component: AdminShow,
        path: routes.adminShow(),
        permissions: [
        ],
    },
    {
        component: AdminCreate,
        path: routes.adminCreate(),
        permissions: [
        ],
    },
]

export default configs