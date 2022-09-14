import React from 'react'
import store from './store'
import { refreshCart, setGPS } from './stateActions';
import apiCallHandler from '../functions/apiCallHandler';
import { api } from '../functions/urls';
import { useGeolocated } from 'react-geolocated'





export function updateCart() {
    apiCallHandler(
        api.getCart,
        (cart) => store.dispatch(refreshCart(cart)),
        'updateCart',
        true

    )

}

export function updateGPS() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            store.dispatch(setGPS({ lat: position.coords.latitude, long: position.coords.longitude, accuracy: position.coords.accuracy }))
        });
    } else {
        return null;
    }


}
