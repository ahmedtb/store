import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import OrderItemsTable from './components/OrderItemsTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function OrderItemsIndex() {


    const [orderItemsPagination, setorderItemsPagination] = React.useState<pagination<orderItems>>()


    async function fetch(params) {
        return await api.orderItemsIndex({ ...getPaginationParams(orderItemsPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    order items
                </div>
                <div>
                    {/* <AllowedLink to={routes.orderItemCreate()}>create order item</AllowedLink> */}
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[orderItemsPagination, setorderItemsPagination]}
                        property={'product_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='user_name'
                        label={window.localization.user_name}
                        apiCall={fetch}
                        useState={[orderItemsPagination, setorderItemsPagination]}
                    />
                </Col>
            </Row>

            <div>
                <OrderItemsTable orderItems={orderItemsPagination?.data} />
            </div >
            <Paginator log={'OrderItemsIndex'} apiCall={fetch} useState={[orderItemsPagination, setorderItemsPagination]} />
        </Card.Body>
    </Card>

}

