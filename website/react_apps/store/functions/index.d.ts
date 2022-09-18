
export { };
declare global {
    interface Window {
        localization: any;
        user: user;
        admin: admin;
        Echo: any;

    }

    type routeType = {
        path: string,
        component: React.FunctionComponent
    }
    type allowedRoutesType = Array<routeType>

    type storeState = {
        user: user,
        allowedRoutes: allowedRoutesType,
        notification: notification,
        cart: order,
        GPS: GPS,
    }
    type GPS = { lat: number, long: number, accuracy: number }

    type dashboardState = {
        admin: admin,
        allowedRoutes: allowedRoutesType,
        notification: notification,
    }

    type dashboardReduxAction = {
        type: string,
        admin: admin,
        allowedRoutes: allowedRoutesType,
        notification: notification,

    }

    type action = {
        type: string,
        user: user,
        allowedRoutes: allowedRoutesType,
        notification: notification,
        cart: order,
        GPS: GPS
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
        read_at: string,
        data: any,
        notifiable_id: number,
        notifiable_type: string,
        type: string,
        id: number,
        created_at: string,
        updated_at: string,
    }
    type notifications = Array<notification>

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
        roles: Array<string>
    }

    type admins = Array<admin>


    type orderItem = {
        id: number,
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
        status: string,
        GPS: { long: number, lat: number },
        created_at: string,
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

    type slide = {
        id: number,
        image: string,
        to: string
    }
    type slides = Array<slide>


}
window.localization = window.localization || {};
window.user = window.user || {};
window.Echo = window.Echo || {};
window.admin = window.admin || {};



