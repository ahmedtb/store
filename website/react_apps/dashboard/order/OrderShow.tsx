import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditOrderModal from './components/EditOrderModal';

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


    const [redirect, setredirect] = React.useState(false)
    async function deleteOrder() {
        apiCallHandler(
            async () => await api.orderDelete(order?.id),
            (data) => setredirect(true),
            'Order Show delete Order',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.ordersIndex()} />;
    }

    return <div className='p-2'>

        <Card className='my-2'>

            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div>
                        منتج رقم {order?.id}
                    </div>

                    <div>
                        <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                            <div>
                                {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.order)}
                            </div>
                            <div className='d-flex justify-content-around my-2'>
                                <button className="btn btn-secondary" onClick={deleteOrder} data-dismiss="modal">{window.localization.yes}</button>
                                <button className='btn btn-success' data-dismiss="modal">لا</button>
                            </div>

                        </CustomModal>
                        <EditOrderModal order={order} change={getOrderInfo} />
                    </div>

                </div>

            </Card.Header>

            <Card.Body>

                <Row>

                    <Col xs={9}>
                        <div className='fs-4'>{window.localization.name} {order?.name}</div>
                        <div className='fs-4'>{window.localization.price} {order?.price}</div>
                        <div className='fs-4'>  {window.localization.category} {order?.category?.name}</div>
                        <div className='fs-4'>  {window.localization.description} {order?.description}</div>

                    </Col>
                </Row>
            </Card.Body>
        </Card>


    </div>
}