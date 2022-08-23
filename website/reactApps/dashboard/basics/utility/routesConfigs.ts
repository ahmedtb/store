import { routes } from './urls'
import roles from './roles'
import LoginPage from '../LoginPage'


const configs: routeConfigsType = [
    {
        component: LoginPage,
        path: routes.loginPage(),
        permissions: [
        ],
    },

]

export default configs