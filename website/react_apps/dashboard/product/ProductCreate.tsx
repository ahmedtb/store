import React from 'react'
import { api, routes } from '../functions/urls'

import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import SelectWithApiSearch from '../../components/SelectWithApiSearch'
// import UploadMultipleProductsModal from './components/UploadMultipleProductsModal';
import ImagePicker from '../../components/ImagePicker';
import localization from '../../functions/localization';

export default function ProductCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { image: null })

    React.useEffect(() => {
        // console.log('columns', columns)
    }, [columns])


    async function submit() {
        apiCallHandler(
            () => api.createProduct(columns),
            (data) => setredirect(true),
            'CreateProduct',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.productsIndex()} />;
    }
    return (
        <div className='p-4 bg-white'>
            <div className='fs-5 fw-bold'>create product</div>


            <Form.Group className="mb-3">
                <Form.Label >product image</Form.Label>
                <Image className='w-25 d-block mx-auto' onClick={() => { }} src={columns?.image} />
                <ImagePicker
                    maxSize={200 * 1024}
                    setImage={(base64) => {
                        dispatchColumns({ actionType: 'change property', property: 'image', value: base64 })
                    }}
                />
            </Form.Group>




            <Form.Group className="mb-3">
                <Form.Label >product name</Form.Label>
                <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
            </Form.Group>



            <Form.Group className="mb-3">
                <Form.Label >product price</Form.Label>
                <Form.Control type="number" value={columns?.price ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'price', value: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label >product quantity</Form.Label>
                <Form.Control type="number" value={columns?.quantity ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'quantity', value: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label >category</Form.Label>
                <SelectWithApiSearch
                    paginationEndpoint={api.categoriesIndex}
                    setSelectedValue={(value) => dispatchColumns({ actionType: 'change property', property: 'category_id', value: value })}
                    label={localization.category}
                    valueKeyWord='id'
                    nameKeyWord='name'
                    value={columns?.category_id}
                />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label >product description</Form.Label>
                <textarea className='form-control' value={columns?.description ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'description', value: e.target.value })} />
            </Form.Group>

            <div className=" p-2 m-2 d-flex justify-content-center">
                <input onClick={submit} type="button" className='btn btn-success' value="create" />
            </div>

        </div>
    )
}