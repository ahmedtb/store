import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import OrdersTable from './components/OrdersTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';
import apiCallHandler from '../functions/apiCallHandler';

export default function OrdersIndex() {


    const [ordersPagination, setordersPagination] = React.useState<pagination<orders>>()
    const [update, setupdate] = React.useState<number>()


    function fetch(params) {
        return api.ordersIndex({ ...getPaginationParams(ordersPagination), ...params });
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
    function pay(id: number) {
        apiCallHandler(
            () => api.orderPay(id),
            (data) => {alert(data); setupdate(Math.random())},
            'reject',
            true
        )
    }
    
    return <div className='my-2 p-2 shadow' >
            <div className='fs-4 fw-bold'>كل الطلبات</div>

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
                    { title: 'accept', content: (order, index) => order.status == 'ordered' ? <button className='btn btn-success' onClick={() => accept(order.id)}>accept</button> : null },
                    { title: 'reject', content: (order, index) => order.status == 'ordered' ? <button className='btn btn-danger' onClick={() => reject(order.id)}>reject</button> : null },
                    { title: 'pay', content: (order, index) => order.status == 'accepted' ? <button className='btn btn-warning' onClick={() => pay(order.id)}>pay</button> : null },
                    { title: 'print', content: (order, index) => <AllowedLink to={routes.printOrder(order.id)} className='btn btn-warning'>print</AllowedLink> }

                ]} />
            </div >
            <Paginator update={update} log={'OrdersIndex'} apiCall={fetch} useState={[ordersPagination, setordersPagination]} />
     
    </div>

}

