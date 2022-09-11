import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditOrderModal from './components/EditOrderModal';
import AllowedLink from '../components/AllowedLink';

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


        <div>
            order id: {order?.id}
        </div>



        <div>

            <div className=''>{window.localization.user} <AllowedLink to={routes.orderShow(order?.user_id)}>{order?.user?.name}</AllowedLink></div>
            <div>order items</div>
            <div className='d-flex' style={{ height: '100px' }}>
                {
                    order?.order_items?.map((item, index) => {

                        return <div key={index} className='d-flex h-50 d-inline-block'>
                            <img src={api.productImage(item.product_id)} />
                            <div >
                                <div>product name: <AllowedLink to={routes.productShow(item.product_id)}>{item.product?.name}</AllowedLink></div>
                                <div>quantity: {item.quantity}</div>
                                <div>value: {item.value}</div>
                            </div>

                        </div>
                    })
                }
            </div>

        </div>

        <CustomModal buttonClass="btn btn-danger" label={window.localization.delete} >
            <div>
                {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.order)}
            </div>
            <div className='d-flex justify-content-around my-2'>
                <button className="btn btn-secondary" onClick={deleteOrder} data-dismiss="modal">{window.localization.yes}</button>
                <button className='btn btn-success' data-dismiss="modal">لا</button>
            </div>

        </CustomModal>

    </div>
}