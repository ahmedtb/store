
export { };
declare global {
    interface Window {
        localization: any;
        user: userType;
        Echo: any;

    }

    type userType = { 
        name: string,
        roles: Array<string> 
    } | null

    type routeType = {
        path: string,
        component: React.FunctionComponent
    }
    type allowedRoutesType = Array<routeType>
    type notificationType = object | null

    type stateType = {
        user: userType,
        allowedRoutes: allowedRoutesType,
        notification: notificationType
    }

    type action = {
        type: string,
        user: userType,
        allowedRoutes: allowedRoutesType,
        notification: notificationType
    }
    type routeConfigType = {
        component: React.ReactNode | ConnectedComponent
        path: string,
        permissions: Array<string>
    }
    type routeConfigsType = Array<routeConfigType>

    type childrenType = JSX.Element
        | JSX.Element[]
        | string
        | string[]

    type notification = {
        
    }

    type pagination = {
        data: array,
        first_page_url: string,

    }

    type product = {
        name: string,
        id: number
    }
    type products = Array<product>
    type addColumns = Array<{
        title: string,
        content: (item, index:number) => React.ReactNode
    }>

}
window.localization = window.localization || {};
window.user = window.user || {};
window.Echo = window.Echo || {};


