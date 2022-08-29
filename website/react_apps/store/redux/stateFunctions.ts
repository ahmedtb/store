import store from './store'
import { refreshCart } from './stateActions';
import apiCallHandler from '../functions/apiCallHandler';
import { api } from '../functions/urls';





export function updateCart() {
    apiCallHandler(
        api.getCart,
        (cart) => store.dispatch(refreshCart(cart)),
        'updateCart',
        true

    )

}