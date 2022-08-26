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

export default function EditCategoryModal(props: { category: category, change: () => void }) {
    const category = props.category
    const change = props.change


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { ...category })

    React.useEffect(() => {
        dispatchColumns({ actionType: 'set object', object: category })
    }, [category])


    function submit() {
        apiCallHandler(
            () => api.categoryEdit(category?.id, columns),
            (data) => { change(); alert(data) },
            'EditCategoryModal',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.categoriesIndex()} />;
    }
    return (
        <CustomModal buttonClass="btn btn-secondary" label={window.localization.edit} >


            <Form.Group className="mb-3">
                <Form.Label >product name</Form.Label>
                <Form.Control type="text" value={columns?.name} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
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
                <input onClick={submit} type="button" className='btn btn-success' value={window.localization.edit} />
            </div>

        </CustomModal>
    )
}