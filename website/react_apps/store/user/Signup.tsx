import React from 'react'
import { api, routes } from '../functions/urls'

import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import SelectWithApiSearch from '../../components/SelectWithApiSearch'
// import UploadMultipleUsersModal from './components/UploadMultipleUsersModal';
import ImagePicker from '../../components/ImagePicker';
import localization from '../../functions/localization';

export default function Signup() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { })

    React.useEffect(() => {
        // console.log('columns', columns)
    }, [columns])


    function submit() {
        apiCallHandler(
            async () => api.signUp(columns),
            (data) => setredirect(true),
            'Signup',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.home()} />;
    }
    return (
        <div className='bg-white p-2 m-2'>

            <Form.Group className="mb-3">
                <Form.Label >name</Form.Label>
                <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
            </Form.Group>

            
            <Form.Group className="mb-3">
                <Form.Label >phone</Form.Label>
                <Form.Control type="number" value={columns?.phone ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'phone', value: e.target.value })} />
            </Form.Group>

                        
            <Form.Group className="mb-3">
                <Form.Label >email</Form.Label>
                <Form.Control type="email" value={columns?.email ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'email', value: e.target.value })} />
            </Form.Group>
                                    
            <Form.Group className="mb-3">
                <Form.Label >password</Form.Label>
                <Form.Control type="password" value={columns?.password ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'password', value: e.target.value })} />
            </Form.Group>


            <div className=" p-2 m-2 d-flex justify-content-center">
                <input onClick={submit} type="button" className='btn btn-success' value="sign up" />
            </div>

        </div>
    )
}