import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { updateCart } from '../redux/stateFunctions'
import { api } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';
import Paginator from '../../components/Paginator';


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
                    <div>

                        <div>
                            order status {order?.status}
                        </div>
                        <div>
                            order order_items count {order?.order_items?.length}
                        </div>
                        <div className='d-flex' style={{ height: '100px' }}>
                            {
                                order?.order_items?.map((item, index) => {

                                    return <div key={index} className='d-flex h-50 d-inline-block'>
                                        <img src={api.productImage(item.product_id)} />
                                        <div >
                                            <div>product name: {item.product?.name}</div>
                                            <div>quantity: {item.quantity}</div>
                                            <div>value: {item.value}</div>
                                        </div>

                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <button className='btn btn-danger' onClick={() => deleteOrder(order.id)}>delete</button>

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