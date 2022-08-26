import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import OrdersTable from './components/OrdersTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function OrdersIndex() {


    const [ordersPagination, setordersPagination] = React.useState<pagination>()


    async function fetch(params) {
        return await api.ordersIndex({ ...getPaginationParams(ordersPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    قائمة المنتجات
                </div>
                <div>
                    <AllowedLink to={routes.orderCreate()}>تسجيل منتج</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[ordersPagination, setordersPagination]}
                        property={'arabic_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='sellable_category_name'
                        label={window.localization.formatString(window.localization.categoryOf, window.localization.order)}
                        apiCall={fetch}
                        useState={[ordersPagination, setordersPagination]}
                    />
                    <TextFilter
                        apiCall={fetch} useState={[ordersPagination, setordersPagination]}
                        property={'details'}
                        label={window.localization.formatString(window.localization.descriptionOf, window.localization.order)}
                    />
                </Col>
            </Row>

            <div>
                <OrdersTable orders={ordersPagination.data} />
            </div >
            <Paginator log={'OrdersIndex'} apiCall={fetch} useState={[ordersPagination, setordersPagination]} />
        </Card.Body>
    </Card>

}

