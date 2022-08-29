import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import OrdersTable from './components/OrdersTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function CartsIndex() {


    const [ordersPagination, setordersPagination] = React.useState<pagination<orders>>()


    function fetch(params) {
        return api.ordersIndex({ ...getPaginationParams(ordersPagination), ...params, status: 'new' });
    }

    return <Card className='my-2 shadow' >

        <Card.Body>
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
                <OrdersTable orders={ordersPagination?.data} />
            </div >
            <Paginator log={'OrdersIndex'} apiCall={fetch} useState={[ordersPagination, setordersPagination]} />
        </Card.Body>
    </Card>

}

