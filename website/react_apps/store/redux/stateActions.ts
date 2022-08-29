
export const refreshUser = (user: user) => {
    return {
        type: 'refresh-user',
        user: user
    }
}

export const setAllowedRoutes = (allowedRoutes: allowedRoutesType) => {
    return {
        type: 'setAllowedRoutes',
        allowedRoutes: allowedRoutes
    }
}

export const refreshNotification = (notification: notification) => {
    return {
        type: 'refresh-notification',
        notification: notification
    }
}

export const refreshCart = (cart: order) => {
    return {
        type: 'refresh-cart',
        cart: cart
    }
}
