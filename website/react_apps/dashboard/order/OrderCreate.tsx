import React from 'react'
import { api, routes } from '../functions/urls'
import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import SelectWithApiSearch from '../../components/SelectWithApiSearch'
import localization from '../../functions/localization';

export default function OrderCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, {})

    React.useEffect(() => {
        // console.log('columns', columns)
    }, [columns])


    function submit() {
        apiCallHandler(
            () => api.orderCreate(columns),
            (data) => { alert(data); setredirect(true); },
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
                <div>create user</div>
                <div>
                    {/* <UploadMultipleOrdersModal  /> */}
                </div>
            </Card.Header>
            <div className="card-body">




                <Form.Group className="mb-3">
                    <Form.Label >user</Form.Label>
                    <SelectWithApiSearch
                        paginationEndpoint={api.usersIndex}
                        setSelectedValue={(value) => dispatchColumns({ actionType: 'change property', property: 'user_id', value: value })}
                        label={localization.user}
                        valueKeyWord='id'
                        nameKeyWord='name'
                        value={columns?.user_id}
                    />
                </Form.Group>


                <div className=" p-2 m-2 d-flex justify-content-center">
                    <input onClick={submit} type="button" className='btn btn-success' value="create" />
                </div>

            </div>
        </div>
    )
}