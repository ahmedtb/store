import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { updateCart } from '../redux/stateFunctions'
import { api } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';
import Paginator from '../../components/Paginator';
import { Table } from 'react-bootstrap';
import moment from 'moment';


function MyOrders(props: { cart: cart }) {

    const [ordersPag, setordersPag] = React.useState<pagination<orders>>()
    const [update, setupdate] = React.useState<number>()


    function orders() {
        apiCallHandler(
            () => api.myOrders({ with: 'orderItems' }),
            (data) => setordersPag(data),
            'order',
            true
        )
    }

    async function deleteOrder(id: number) {
        apiCallHandler(
            async () => await api.orderDelete(id),
            (data) => setupdate(Math.random()),
            'Order Show delete Order',
            true
        )
    }

    return <div className='bg-white'>
        {
            ordersPag?.data?.map((order, index) => {
                return <div key={index} className='border p-2 m-2 rounded'>
                    <button className='btn btn-danger d-block me-auto ms-2' onClick={() => deleteOrder(order.id)}>حدف</button>
                    <div className='d-flex flex-wrap justify-content-between align-items-start p-2'>



                        <div className='d-flex flex-wrap'>
                            {
                                order?.order_items?.map((item, index) => {

                                    return <div key={index} className='d-flex'>
                                        <img src={api.productImage(item.product_id)} width={100} />
                                        <div >
                                            <div>إسم المنتج: {item.product?.name}</div>
                                            <div>سعر المنتج: {item.product?.price}</div>
                                            <div>الكمية: {item.quantity}</div>
                                            <div>القيمة الكلية: {item.value}</div>
                                        </div>

                                    </div>
                                })
                            }
                        </div>

                        <Table bordered responsive className=''>

                            <tbody>
                                <tr>
                                    <td>رقم الطلبية</td>
                                    <td>{order?.id} </td>
                                </tr>
                                <tr>
                                    <td>حالة الطلبية</td>
                                    <td>{order?.status} </td>
                                </tr>
                                <tr>
                                    <td>موقع الطلبية</td>
                                    <td>lat: {order?.GPS?.lat}, long: {order?.GPS?.long} </td>
                                </tr>

                                <tr>
                                    <td>وقت الانشاء</td>
                                    <td>{moment(order?.created_at).format('yyyy-MM-DD H:mm')} </td>
                                </tr>

                            </tbody>
                        </Table>


                    </div>

                </div>
            })
        }
        <Paginator update={update} log={'Home'} apiCall={orders} useState={[ordersPag, setordersPag]} />


    </div>
}

const mapStateToProps = (state: { state: storeState }) => {
    return {
        cart: state.state.cart,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshCart: (cart: order) => dispatch(refreshCart(cart)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)