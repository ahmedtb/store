
export const refreshAdmin = (admin: admin) => {
    return {
        type: 'refresh-admin',
        admin: admin
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
