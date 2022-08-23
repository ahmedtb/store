import { routes } from './urls'
import roles from './roles'
import LoginPage from '../LoginPage'
import Home from '../../Home'
import Phone from '../../Phone'

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
        component: Phone,
        path: routes.phone(),
        permissions: [
        ],
    }
]

export default configs