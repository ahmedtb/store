
export default function objectUseReducerFunction(object, action) {
    let newobject = { ...object }

    switch (action.actionType) {
        case 'set object':
            return action.object
        case 'change property':
            newobject[action.property] = action.value
            return newobject

        case 'remove property':
            delete newobject[action.property];
            return newobject

        case 'add property':
            newobject[action.property] = action.value
            return newobject

        case 'add object properties':
            console.log('add object', (action.object))
            return { ...newobject, ...action.object }

    }
    return object;
}