import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { updateCart } from '../redux/stateFunctions'
import { api } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import { useGeolocated } from 'react-geolocated'

function CartItems(props: { cart: order }) {

    React.useEffect(() => {
        updateCart()
    }, [])

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    function order(lat: number, long: number) {
        apiCallHandler(
            () => api.cartToOrdered(lat, long),
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
        <CustomModal label='order'>
            {
                !isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation</div>
                ) : !isGeolocationEnabled ? (
                    <div>Geolocation is not enabled</div>
                ) : coords ? (
                    <div>

                        <table>
                            <tbody>
                                <tr>
                                    <td>latitude</td>
                                    <td>{coords.latitude}</td>
                                </tr>
                                <tr>
                                    <td>longitude</td>
                                    <td>{coords.longitude}</td>
                                </tr>
                                <tr>
                                    <td>accuracy</td>
                                    <td>{coords.accuracy}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            your current location will be used to delivare the order
                        </div>
                        <iframe width="600" height="500" src={"https://maps.google.com/maps?q=" + coords.latitude + ",%20" + coords.longitude + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}></iframe>
                        <button onClick={() => order(coords.latitude, coords.longitude)} className='btn btn-success'>order</button>
                    </div>

                ) : (
                    <div>Getting the location data&hellip; </div>
                )
            }
        </CustomModal>
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