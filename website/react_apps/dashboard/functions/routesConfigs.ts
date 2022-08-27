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
]

export default configs