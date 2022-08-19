
export const refreshUser = (user) => {
    return {
        type: 'refresh-user',
        user: user
    }
}

export const setAllowedRoutes = (allowedRoutes) => {
    return {
        type: 'setAllowedRoutes',
        allowedRoutes: allowedRoutes
    }
}

export const refreshNotification = (notification) => {
    return {
        type: 'refresh-notification',
        notification: notification
    }
}
