import React from 'react'
import { api, routes } from '../../functions/urls'
import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../../functions/objectUseReducerFunction'
import apiCallHandler from '../../functions/apiCallHandler'
import SelectWithApiSearch from '../../../components/SelectWithApiSearch'
import ImagePicker from '../../../components/ImagePicker';
import localization from '../../../functions/localization';
import CustomModal from '../../../components/CustomModal';

export default function EditOrderModal(props: { order: order, change: () => void }) {
    const order = props.order
    const change = props.change


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { ...order })

    React.useEffect(() => {
        dispatchColumns({ actionType: 'set object', object: order })
    }, [order])


    async function submit() {
        apiCallHandler(
            async () => await api.editOrder(order?.id, columns),
            (data) => { change(); },
            'EditOrderModal',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.ordersIndex()} />;
    }
    return (
        <CustomModal buttonClass="btn btn-secondary" label={'تعديل منتج'} >

            <div className="card">
                <div className="card-body">


                    <div className=" p-2 m-2 d-flex justify-content-center">
                        <input onClick={submit} type="button" className='btn btn-success' value="تعديل" />
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}