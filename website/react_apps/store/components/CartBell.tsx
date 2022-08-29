import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { AiOutlineShoppingCart } from 'react-icons/ai'
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

    return <div>
        <AllowedLink to={routes.cartItems()} className="text-decoration-none" >
            <AiOutlineShoppingCart width='25' color={'black'} />
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