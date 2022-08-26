import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditOrderItemModal from './components/EditOrderItemModal';

export default function OrderItemShow(props) {

    const { id } = useParams();
    const [orderItem, setorderItem] = React.useState(null)

    async function getOrderItemInfo() {
        apiCallHandler(
            async () => await api.orderItemShow(+id),
            setorderItem,
            'OrderItemShow getOrderItemInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getOrderItemInfo()
        }
    }, [id])


    const [redirect, setredirect] = React.useState(false)
    async function deleteOrderItem() {
        apiCallHandler(
            async () => await api.orderItemDelete(orderItem?.id),
            (data) => setredirect(true),
            'OrderItem Show delete OrderItem',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.orderItemsIndex()} />;
    }

    return <div className='p-2'>

        <Card className='my-2'>

            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div>
                        منتج رقم {orderItem?.id}
                    </div>

                    <div>
                        <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                            <div>
                                {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.orderItem)}
                            </div>
                            <div className='d-flex justify-content-around my-2'>
                                <button className="btn btn-secondary" onClick={deleteOrderItem} data-dismiss="modal">{window.localization.yes}</button>
                                <button className='btn btn-success' data-dismiss="modal">لا</button>
                            </div>

                        </CustomModal>
                        <EditOrderItemModal orderItem={orderItem} change={getOrderItemInfo} />
                    </div>

                </div>

            </Card.Header>

            <Card.Body>

                <Row>
   

                    <Col xs={9}>
                        <div className='fs-4'>{window.localization.name} {orderItem?.name}</div>
                        <div className='fs-4'>{window.localization.price} {orderItem?.price}</div>
                        <div className='fs-4'>  {window.localization.category} {orderItem?.category?.name}</div>
                        <div className='fs-4'>  {window.localization.description} {orderItem?.description}</div>

                    </Col>
                </Row>
            </Card.Body>
        </Card>


    </div>
}