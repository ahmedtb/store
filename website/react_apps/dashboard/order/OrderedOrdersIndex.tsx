import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import OrdersTable from './components/OrdersTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';
import apiCallHandler from '../functions/apiCallHandler';

export default function OrderedOrdersIndex() {


    const [ordersPagination, setordersPagination] = React.useState<pagination<orders>>()
    const [update, setupdate] = React.useState<number>()


    function fetch(params) {
        return api.ordersIndex({ ...getPaginationParams(ordersPagination), ...params, status: 'ordered', });
    }

    function accept(id: number) {
        apiCallHandler(
            () => api.orderAccept(id),
            (data) => {alert(data); setupdate(Math.random())},
            'accept',
            true
        )
    }
    function reject(id: number) {
        apiCallHandler(
            () => api.orderReject(id),
            (data) => {alert(data); setupdate(Math.random())},
            'reject',
            true
        )
    }
    return <div className='m-2 p-2 bg-white' >


        <Row className='align-items-center'>
            <Col>
                <TextFilter
                    apiCall={fetch} useState={[ordersPagination, setordersPagination]}
                    property={'user_name'}
                    label={window.localization.name}
                />

            </Col>
            <Col>

            </Col>
        </Row>

        <div>
            <OrdersTable orders={ordersPagination?.data} addColumns={[
                { title: 'accept', content: (order, index) => <button onClick={() => accept(order.id)}>accept</button> },
                { title: 'reject', content: (order, index) => <button onClick={() => reject(order.id)}>reject</button> }
            ]} />
        </div >
        <Paginator update={update} log={'OrdersIndex'} apiCall={fetch} useState={[ordersPagination, setordersPagination]} />
    </div>

}

