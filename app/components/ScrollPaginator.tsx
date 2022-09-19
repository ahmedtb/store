import React from 'react'
import { apiCallHandler, getPaginationParams } from '../urls'
import { View, ActivityIndicator, FlatList, ListRenderItem } from 'react-native'
import { AxiosResponse } from 'axios'
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from './LoadingIndicator';

export default function ScrollPaginator(props: {
    apiCall: (params: object) => Promise<AxiosResponse>,
    update?: any,
    log?: string,
    page_size?: number,
    renderItem: ListRenderItem<object>
}) {
    const apiCall = props.apiCall
    const update = props.update
    const log = props.log
    const props_page_size = props.page_size
    const renderItem = props.renderItem

    const [pagination, setpagination] = React.useState<pagination<any>>()
    const [data, setdata] = React.useState<Array<any>>([])

    const [randStr, setrandStr] = React.useState(Math.random().toString(36).slice(2, 7))


    function fetchData(next = false) {

        let allParams = { ...getPaginationParams(pagination, next), page_size: props_page_size ?? 5 }
        // console.log('all params', getPaginationParams(pagination, next))
        trackPromise(

            apiCallHandler(
                () => { return apiCall(allParams) },
                (pagination) => { setpagination(pagination); setdata(pre => [...pre, ...pagination.data]) },
                log,
                log ? true : false
            )
            , randStr)

    }

    React.useEffect(() => {
        setdata([])
        fetchData()
    }, [update])

    // React.useEffect(() => {
    //     console.log('ScrollPaginator pagination', pagination?.next_page_url)
    // }, [pagination])

    return <View>

        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => fetchData(true)}
            contentContainerStyle={{
                marginBottom: 200
            }}
        />
        <LoadingIndicator area={randStr} />

    </View>
}