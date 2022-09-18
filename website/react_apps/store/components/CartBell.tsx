import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { FiShoppingCart } from 'react-icons/fi'
import AllowedLink from './AllowedLink';
import { routes, api } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';

function CartBell(props: { cart: order, user: user, refreshCart: typeof refreshCart }) {

    function fetchCartItems() {
        apiCallHandler(
            api.getCart,
            props.refreshCart,
            'fetchCartItems',
            true
        )
    }

    React.useEffect(() => {
        if (props.user) {
            fetchCartItems()
        }
    }, [props.user])

    return <div className='mx-1'>
        <AllowedLink to={routes.cartItems()} className="text-decoration-none position-relative" >
            <div className='text-warning position-absolute top-0 end-0'>
                {props.cart?.order_items?.length ?? 0}
            </div>
            <div className='d-flex mt-1 p-2'>
                <FiShoppingCart size={35} color={'white'} />
                <div className='text-white align-self-end fw-bold'>السلة</div>
            </div>

        </AllowedLink>
    </div>
}

const mapStateToProps = (state: { state: storeState }) => {
    return {
        user: state.state.user,
        cart: state.state.cart,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshCart: (cart: order) => dispatch(refreshCart(cart)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartBell)