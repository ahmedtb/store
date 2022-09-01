
export { };
declare global {
    interface Window {
        localization: any;
        user: user;
        Echo: any;

    }

    type routeType = {
        path: string,
        component: React.FunctionComponent
    }
    type allowedRoutesType = Array<routeType>
    type notificationType = object | null

    type storeState = {
        user: user,
        allowedRoutes: allowedRoutesType,
        notification: notificationType,
        cart: order
    }


    type dashboardState = {
        user: user,
        allowedRoutes: allowedRoutesType,
        notification: notificationType,
    }

    type action = {
        type: string,
        user: user,
        allowedRoutes: allowedRoutesType,
        notification: notificationType,
        cart: order

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
        | number
        | ComponentType<never>

    type notification = {

    }

    type pagination<T> = {
        data: T,
        first_page_url: string,

    }

    type product = {
        name: string,
        id: number,
        price: number,
        description: string,
        category_id: number,
        category: category,
        quantity: string,
        image: string,
    }
    type products = Array<product>
    type addColumns = Array<{
        title: string,
        content: (item, index: number) => React.ReactNode
    }>


    type user = {
        id: number,
        name: string,
        email: string,
        phone: string,
        roles: Array<string>

    }

    type users = Array<user>

    type brand = {
        id: number,
        name: string,
        image: string
    }

    type brands = Array<brand>

    type admin = {
        id: number,
        name: string,
        username: string,
    }

    type admins = Array<admin>


    type orderItem = {
        id: number,
        name: string,
        product: product,
        product_id: number,
        order: order,
        order_id: number,
        quantity: number,
        value: number,

    }

    type orderItems = Array<orderItem>

    type order = {
        id: number,
        user_id: number,
        user: user,
        order_items: Array<orderItem>,
        status: string
    }
    type cart = order

    type orders = Array<order>

    type category = {
        id: number,
        name: string,
        parent_id: number,
        parent: category
    }

    type categories = Array<category>

}
window.localization = window.localization || {};
window.user = window.user || {};
window.Echo = window.Echo || {};


