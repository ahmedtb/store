import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import OrderItemsTable from './components/OrderItemsTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function OrderItemsIndex() {


    const [orderItemsPagination, setorderItemsPagination] = React.useState<pagination>()


    async function fetch(params) {
        return await api.orderItemsIndex({ ...getPaginationParams(orderItemsPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    قائمة المنتجات
                </div>
                <div>
                    <AllowedLink to={routes.orderItemCreate()}>تسجيل منتج</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[orderItemsPagination, setorderItemsPagination]}
                        property={'arabic_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='sellable_category_name'
                        label={window.localization.formatString(window.localization.categoryOf, window.localization.orderItem)}
                        apiCall={fetch}
                        useState={[orderItemsPagination, setorderItemsPagination]}
                    />
                    <TextFilter
                        apiCall={fetch} useState={[orderItemsPagination, setorderItemsPagination]}
                        property={'details'}
                        label={window.localization.formatString(window.localization.descriptionOf, window.localization.orderItem)}
                    />
                </Col>
            </Row>

            <div>
                <OrderItemsTable orderItems={orderItemsPagination.data} />
            </div >
            <Paginator log={'OrderItemsIndex'} apiCall={fetch} useState={[orderItemsPagination, setorderItemsPagination]} />
        </Card.Body>
    </Card>

}

