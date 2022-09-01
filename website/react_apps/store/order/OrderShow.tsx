import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';

export default function OrderShow(props) {

    const { id } = useParams();
    const [order, setorder] = React.useState(null)

    async function getOrderInfo() {
        apiCallHandler(
            async () => await api.orderShow(+id),
            setorder,
            'OrderShow getOrderInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getOrderInfo()
        }
    }, [id])


    return <div className='p-2'>

        <Card className='my-2'>

            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div>
                        order {order?.id}
                    </div>


                </div>

            </Card.Header>

            <Card.Body>

                <Row>

                    <Col xs={9}>
                        <div>
                            order status {order?.status}
                        </div>
                        <div>
                            order order_items count {order?.order_items?.length}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>


    </div>
}