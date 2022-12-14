import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { refreshCart } from '../redux/stateActions';
import { updateCart, updateGPS } from '../redux/stateFunctions'
import { api } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import { FiShoppingCart } from 'react-icons/fi'

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

    function removeFromCart(id: number) {
        apiCallHandler(
            () => api.removeFromCart(id),
            () => updateCart(),
            'order',
            true
        )
    }

    return <div className='bg-white p-2'>

        <div className='d-flex '>
            <FiShoppingCart size={35} color={'black'} />
            <div className='fs-3 mx-1 fw-bold'>السلة الحالية</div>
        </div>
        {
            !props.cart?.order_items?.length ? <div className='fs-5 mt-3 mx-3 fw-bold '>السلة فارعة</div> : null
        }
        <div className='row'>
            <div className='col-7'>
                {
                    props.cart?.order_items?.map((item, index) => {
                        return <div key={index} className='d-flex border p-2 m-2 rounded'>
                            <img src={api.productImage(item.product_id)} className='w-25' />
                            <div>
                                <div>
                                    إسم المنتج {item?.product?.name}
                                </div>
                                <div>
                                    سعر المنتج {item?.product?.price}
                                </div>
                                <div>
                                    كمية البند {item?.quantity}
                                </div>
                                <div>
                                    القيمة الكلية {item?.value}
                                </div>
                            </div>
                            <button className='btn btn-danger align-self-end me-auto' onClick={() => removeFromCart(item.id)}>إزالة من السلة</button>

                        </div>
                    })
                }
            </div>
            <div className='col'>
                <div className='fs-4 fw-bold m-1'>
                    موقعك الحالية سيستعمل لتوصيل الطلبية
                </div>
                <iframe className='w-75' src={"https://maps.google.com/maps?q=" + props.GPS?.lat + ",%20" + props.GPS?.long + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}></iframe>

            </div>
        </div>


        <CustomModal label='إرسال الطلب' buttonClass='btn btn-success mx-auto d-block'>

            <div>

                <table>
                    <tbody>
                        <tr>
                            <td>خط العرض</td>
                            <td>{props.GPS?.lat}</td>
                        </tr>
                        <tr>
                            <td>خط الطول</td>
                            <td>{props.GPS?.long}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    موقعك الحالية سيستعمل لتوصيل الطلبية
                </div>
                <button onClick={() => order(props.GPS?.lat, props.GPS?.long)} className='btn btn-success'>إرسال الطلب</button>
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