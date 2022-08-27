import React from 'react'
import { api, routes } from '../functions/urls'
import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'


export default function AdminCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { })

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
                <div>create admin</div>
            </Card.Header>
            <div className="card-body">

                <Form.Group className="mb-3">
                    <Form.Label >admin name</Form.Label>
                    <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >admin username</Form.Label>
                    <Form.Control type="text" value={columns?.username ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'username', value: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label >admin password</Form.Label>
                    <Form.Control type="text" value={columns?.password ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'password', value: e.target.value })} />
                </Form.Group>

                <div className=" p-2 m-2 d-flex justify-content-center">
                    <input onClick={submit} type="button" className='btn btn-success' value="create" />
                </div>

            </div>
        </div>
    )
}