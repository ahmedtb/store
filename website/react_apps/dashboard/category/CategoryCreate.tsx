import React from 'react'
import { api, routes } from '../functions/urls'
import { Navigate } from 'react-router'
import { Form } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import SelectWithApiSearch from '../../components/SelectWithApiSearch'
import localization from '../../functions/localization';

export default function CategoryCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, {})

    function submit() {
        apiCallHandler(
            () => api.categoryCreate(columns),
            (data) => { alert(data); setredirect(true) },
            'CreateCategory',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.categoriesIndex()} />;
    }
    return (
        <div className='p-5 bg-white' >
            <div className='fs-5 fw-bold'>category create</div>

            <Form.Group className="mb-3">
                <Form.Label >إسم المنتج</Form.Label>
                <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label >category</Form.Label>
                <SelectWithApiSearch
                    paginationEndpoint={api.categoriesIndex}
                    setSelectedValue={(value) => dispatchColumns({ actionType: 'change property', property: 'parent_id', value: value })}
                    label={localization.category}
                    valueKeyWord='id'
                    nameKeyWord='name'
                    value={columns?.parent_id}
                />
            </Form.Group>


            <div className=" p-2 m-2 d-flex justify-content-center">
                <input onClick={submit} type="button" className='btn btn-success' value={window.localization.create} />
            </div>

        </div>
    )
}