import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

import { View, ActivityIndicator, FlatList, ListRenderItem } from 'react-native'

export default function LoadingIndicator(props) {

    const { promiseInProgress } = usePromiseTracker({ area: props.area });


    return (
        promiseInProgress && <View
        >
            <ActivityIndicator />
        </View>
    );
}