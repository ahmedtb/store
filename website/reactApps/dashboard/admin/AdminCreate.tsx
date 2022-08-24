import React from 'react'
import { api, routes } from '../functions/urls'

import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import SelectWithApiSearch from '../../components/SelectWithApiSearch'
// import UploadMultipleAdminsModal from './components/UploadMultipleAdminsModal';
import ImagePicker from '../../components/ImagePicker';
import localization from '../../functions/localization';

export default function AdminCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { image: null })

    React.useEffect(() => {
        // console.log('columns', columns)
    }, [columns])


    async function submit() {
        apiCallHandler(
            async () => await api.adminCreate(columns),
            (data) => setredirect(true),
            'CreateAdmin',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.adminsIndex()} />;
    }
    return (
        <div className="card">
            <Card.Header className='d-flex justify-content-between'>
                <div>تسجيل منتج</div>
                <div>
                    {/* <UploadMultipleAdminsModal  /> */}
                </div>
            </Card.Header>
            <div className="card-body">


                <div className=" p-2 m-2 d-flex justify-content-center">
                    <input onClick={submit} type="button" className='btn btn-success' value="تسجيل" />
                </div>

            </div>
        </div>
    )
}