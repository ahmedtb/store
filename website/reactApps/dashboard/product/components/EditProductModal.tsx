import React from 'react'
import { api, routes } from '../../functions/urls'
import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../../functions/objectUseReducerFunction'
import apiCallHandler from '../../functions/apiCallHandler'
import SelectSearch from '../../../components/SelectSearch'
import ImagePicker from '../../../components/ImagePicker';
import localization from '../../../components/localization';
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
            async () => await api.editProduct(product?.id, columns),
            (data) => { change(); },
            'EditProductModal',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.productsIndex()} />;
    }
    return (
        <CustomModal buttonClass="btn btn-secondary" label={'تعديل منتج'} >

            <div className="card">
                <div className="card-body">


                    <Form.Group className="mb-3">
                        <Form.Label >اسم المنتج بالعربي</Form.Label>
                        <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label >{localization.price}</Form.Label>
                        <Form.Control type='number' step='0.01' value={columns?.price ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'price', value: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >{localization.categoryOfProduct}</Form.Label>
                        <SelectSearch
                            paginationEndpoint={api.categoriesIndex}
                            setSelectedValue={(value) => dispatchColumns({ actionType: 'change property', property: 'category_id', value: value })}
                            label={'تصنيف'}
                            valueKeyWord='id'
                            nameKeyWord='name'
                            value={columns?.category_id ?? ''}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >صورة للمنتج</Form.Label>
                        <Image className='col-2' onClick={() => { }} src={columns?.image} />
                        <ImagePicker
                            maxSize={200 * 1024}
                            setImage={(base64) => {
                                dispatchColumns({ actionType: 'change property', property: 'image', value: base64 })
                            }}
                        />
                    </Form.Group>



                    <div className=" p-2 m-2 d-flex justify-content-center">
                        <input onClick={submit} type="button" className='btn btn-success' value="تعديل" />
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}