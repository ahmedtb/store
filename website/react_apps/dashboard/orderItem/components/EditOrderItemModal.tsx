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

export default function EditOrderItemModal(props: { orderItem: orderItem, change: () => void }) {
    const orderItem = props.orderItem
    const change = props.change


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { ...orderItem })

    React.useEffect(() => {
        dispatchColumns({ actionType: 'set object', object: orderItem })
    }, [orderItem])


    async function submit() {
        apiCallHandler(
            async () => await api.orderItemEdit(orderItem?.id, columns),
            (data) => { change(); },
            'EditOrderItemModal',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.orderItemsIndex()} />;
    }
    return (
        <CustomModal buttonClass="btn btn-secondary" label={'تعديل منتج'} >

            <div className="card">
                <div className="card-body">


                    <Form.Group className="mb-3">
                        <Form.Label >اسم المنتج بالعربي</Form.Label>
                        <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
                    </Form.Group>



                    <div className=" p-2 m-2 d-flex justify-content-center">
                        <input onClick={submit} type="button" className='btn btn-success' value="تعديل" />
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}