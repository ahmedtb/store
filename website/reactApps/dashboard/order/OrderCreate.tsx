import React from 'react'
import { api, routes } from '../functions/urls'

import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import SelectWithApiSearch from '../../components/SelectWithApiSearch'
// import UploadMultipleOrdersModal from './components/UploadMultipleOrdersModal';
import ImagePicker from '../../components/ImagePicker';
import localization from '../../functions/localization';

export default function OrderCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { image: null })

    React.useEffect(() => {
        // console.log('columns', columns)
    }, [columns])


    async function submit() {
        apiCallHandler(
            async () => await api.orderCreate(columns),
            (data) => setredirect(true),
            'CreateOrder',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.ordersIndex()} />;
    }
    return (
        <div className="card">
            <Card.Header className='d-flex justify-content-between'>
                <div>تسجيل منتج</div>
                <div>
                    {/* <UploadMultipleOrdersModal  /> */}
                </div>
            </Card.Header>
            <div className="card-body">


                <Form.Group className="mb-3">
                    <Form.Label >اسم المنتج</Form.Label>
                    <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >{localization.price}</Form.Label>
                    <Form.Control type='number' step='0.01' value={columns?.price ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'price', value: e.target.value })} />
                </Form.Group>



                <div className=" p-2 m-2 d-flex justify-content-center">
                    <input onClick={submit} type="button" className='btn btn-success' value="تسجيل" />
                </div>

            </div>
        </div>
    )
}