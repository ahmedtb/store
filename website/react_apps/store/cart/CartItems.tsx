import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { updateCart } from '../redux/stateFunctions'
import { api } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';


function CartItems(props: { cart: order }) {

    React.useEffect(() => {
        updateCart()
    }, [])

    function order() {
        apiCallHandler(
            api.cartToOrdered,
            () => updateCart(),
            'order',
            true
        )
    }

    return <div className='bg-white'>
        <div className='fs-3 fw-bold'>you current cart</div>
        {
            props.cart?.order_items?.map((item, index) => {
                return <div key={index} className='d-flex border p-2 m-2 rounded'>
                    <img src={api.productImage(item.product_id)} className='w-25' />
                    <div>
                    <div>
                        product name {item?.product?.name}
                    </div>
                    <div>
                        product price {item?.product?.price}
                    </div>
                    <div>
                        item quantity {item?.quantity}
                    </div>
                    <div>
                        item value {item?.value}
                    </div>
                    </div>

                </div>
            })
        }
        <div>
            status {props.cart?.status}
        </div>

        <button onClick={order} className='btn btn-success'>order</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)