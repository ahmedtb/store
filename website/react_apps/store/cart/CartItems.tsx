import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { updateCart, updateGPS } from '../redux/stateFunctions'
import { api } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import { useGeolocated } from 'react-geolocated'

function CartItems(props: { cart: order, GPS: GPS }) {

    React.useEffect(() => {
        updateCart()
        updateGPS()
    }, [])


    function order(lat: number, long: number) {
        apiCallHandler(
            () => api.cartToOrdered(lat, long),
            () => updateCart(),
            'order',
            true
        )
    }

    return <div className='bg-white p-2'>
        <div className='fs-3 fw-bold'>current cart</div>
        {/* <div>
            cart status {props.cart?.status}
        </div> */}
        <div className='row'>
            <div className='col-7'>
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
                            <button className='btn btn-danger align-self-center ms-auto'>delete</button>

                        </div>
                    })
                }
            </div>
            <div className='col'>
                <div>
                    your current location will be used to delivare the order
                </div>
                <iframe className='w-75' src={"https://maps.google.com/maps?q=" + props.GPS?.lat + ",%20" + props.GPS?.long + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}></iframe>

            </div>
        </div>


        <CustomModal label='order' buttonClass='btn btn-success mx-auto d-block'>

            <div>

                <table>
                    <tbody>
                        <tr>
                            <td>latitude</td>
                            <td>{props.GPS?.lat}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td>{props.GPS?.long}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    your current location will be used to delivare the order
                </div>
                <button onClick={() => order(props.GPS?.lat, props.GPS?.long)} className='btn btn-success'>order</button>
            </div>

        </CustomModal>
    </div>
}

const mapStateToProps = (state: { state: storeState }) => {
    return {
        cart: state.state.cart,
        GPS: state.state.GPS,

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshCart: (cart: order) => dispatch(refreshCart(cart)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems)