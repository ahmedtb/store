export type userType = { roles: Array<string> } | null
export type allowedRoutesType = Array<object>
export type notificationType = object | null

export type stateType = {
    user: userType,
    allowedRoutes: allowedRoutesType,
    notification: notificationType
}

export type action = {
    type: string,
    user: userType,
    allowedRoutes: allowedRoutesType,
    notification: notificationType
}

export type routeConfigsType = Array<object>
