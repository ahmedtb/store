
export const setUserNotification = (notification) => (
    {
        type: 'setUserNotification',
        notification: notification
    }
);

export const setExpoPushToken = (expoPushToken) => (
    {
        type: 'setExpoPushToken',
        expoPushToken: expoPushToken
    }
);

export const setCategories = (categories) => (
    {
        type: 'setCategories',
        categories: categories
    }
);


export const setUser = (user: user) => (
    {
        type: 'setUser',
        user: user
    }
);

export const setToken = (token: string) => (
    {
        type: 'setToken',
        token: token
    }
);