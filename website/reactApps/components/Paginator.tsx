import React from 'react'
import { Pagination } from 'react-bootstrap'
import apiCallHandler from '../functions/apiCallHandler'
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from './LoadingIndicator';
import localization from './localization';

export default function Paginator(props) {
    const apiCall = props.apiCall
    const update = props.update
    const log = props.log
    const includeURLSearchParams = props.includeURLSearchParams
    const loadingIndicator = props.loadingIndicator

    const [data, setdata] = props.useState
    // const page_size = props.page_size
    const [page_size, setpage_size] = React.useState(props.page_size ?? 10)

    const [customeSize, setcustomeSize] = React.useState<number>(0)


    const [randStr, setrandStr] = React.useState(Math.random().toString(36).slice(2, 7))


    function fetchData(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        let allParams = { ...linkParams, ...params, page_size: page_size }
        // console.log('Paginator allParams', allParams)
        trackPromise(
            apiCallHandler(
                () => { setdata([]); return apiCall(allParams) },
                (data) => { setdata(data); },
                log ?? 'Paginator fetchData',
                log ?? false
            )
            , randStr)

    }

    React.useEffect(() => {
        var params = includeURLSearchParams ? Object.fromEntries(new URLSearchParams(location.search)) : {};
        fetchData(null, params)
    }, [update, page_size])

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div className='my-1 mx-2'>{localization.totalCount}: {data?.total}</div>

                <div className='d-flex align-items-center my-2'>
                    <div className='mx-2'>{localization.page_size}</div>
                    {
                        customeSize != 0 ? null :
                            <select value={page_size} onChange={e => {
                                if (Number(e.target.value) != customeSize) {
                                    setcustomeSize(0)
                                    setpage_size(e.target.value)
                                } else {
                                    setcustomeSize(page_size)
                                }
                            }}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={250}>250</option>
                                <option value={500}>500</option>
                                <option value={customeSize}>{customeSize != 0 ? customeSize : 'ادخال حجم الصفحة'}</option>
                            </select>
                    }
                    {
                        customeSize != 0 ? <div>

                            <input type='number' value={customeSize} onChange={e => setcustomeSize(Number(e.target.value))} />
                            <button className='btn btn-primary me-1' onClick={() => {
                                setpage_size(customeSize)
                            }}>تحديد الحجم</button>
                        </div> : null
                    }
                </div>

            </div>


            <Pagination>
                {
                    loadingIndicator != false ? <LoadingIndicator area={randStr} /> : null
                }


                {
                    // if only one page don't show links
                    data?.links?.length != 3 ?
                        data?.links?.map((link, index) => {
                            if (link['url'] && index == 0) {
                                return <Pagination.Prev key={index} onClick={() => fetchData(link['url'])}>{localization.previous}</Pagination.Prev>
                            }
                            if (link['url'] && index == data?.links.length - 1) {
                                return <Pagination.Next key={index} onClick={() => fetchData(link['url'])}>{localization.next}</Pagination.Next>
                            }
                            if (link['url'] && index && index != data?.links.length - 1)
                                return <Pagination.Item active={link.active} key={index} onClick={() => fetchData(link['url'])}>{link['label']}</Pagination.Item>
                        }) : null
                }
            </Pagination>
        </div>
    )
}