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


    function orders() {
        apiCallHandler(
            () => api.myOrders({ with: 'orderItems' }),
            (data) => setordersPag(data),
            'order',
            true
        )
    }

    return <div className='bg-white'>
        {
            ordersPag?.data?.map((order, index) => {
                return <div key={index} className='d-flex border p-2 m-2 rounded'>
                    <div>

                        <div>
                            order status {order?.status}
                        </div>
                        <div>
                            order order_items count {order?.order_items?.length}
                        </div>
                    </div>

                </div>
            })
        }
        <Paginator log={'Home'} apiCall={orders} useState={[ordersPag, setordersPag]} />


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