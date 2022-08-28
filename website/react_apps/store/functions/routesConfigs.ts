import { routes } from './urls'
import roles from './roles'
import LoginPage from '../LoginPage'
import Home from '../Home'
import ProductShow from '../ProductShow'

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
    }
]

export default configs