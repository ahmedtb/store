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

export default function EditProductModal(props: { product: product, change: () => void }) {
    const product = props.product
    const change = props.change


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { ...product })

    React.useEffect(() => {
        dispatchColumns({ actionType: 'set object', object: product })
    }, [product])


    async function submit() {
        apiCallHandler(
            async () => await api.productEdit(product?.id, columns),
            (data) => { change(); alert(data) },
            'EditProductModal',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.productsIndex()} />;
    }
    return (
        <CustomModal buttonClass="btn btn-secondary" label={window.localization.edit} >



            <Form.Group className="mb-3">
                <Form.Label >product image</Form.Label>
                <Image className='w-25 d-block mx-auto' onClick={() => { }} src={columns?.image ?? api.productImage(columns?.id)} />
                <ImagePicker
                    maxSize={200 * 1024}
                    setImage={(base64) => {
                        dispatchColumns({ actionType: 'change property', property: 'image', value: base64 })
                    }}
                />
            </Form.Group>




            <Form.Group className="mb-3">
                <Form.Label >product name</Form.Label>
                <Form.Control type="text" value={columns?.name} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
            </Form.Group>



            <Form.Group className="mb-3">
                <Form.Label >product price</Form.Label>
                <Form.Control type="number" value={columns?.price} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'price', value: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label >product quantity</Form.Label>
                <Form.Control type="number" value={columns?.quantity} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'quantity', value: e.target.value })} />
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
                <textarea className='form-control' value={columns?.description} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'description', value: e.target.value })} />
            </Form.Group>

            <div className=" p-2 m-2 d-flex justify-content-center">
                <input onClick={submit} type="button" className='btn btn-success' value="تعديل" />
            </div>
        </CustomModal>
    )
}