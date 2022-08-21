export type userType = { roles: Array<string> } | null
export type allowedRoutesType = Array<{
    exact: boolean,
    path: string
}>
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

export type childrenType = JSX.Element
    | JSX.Element[]
    | string
    | string[]