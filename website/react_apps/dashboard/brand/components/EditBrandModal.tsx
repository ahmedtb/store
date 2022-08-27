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

export default function EditBrandModal(props: { brand: brand, change: () => void }) {
    const brand = props.brand
    const change = props.change


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { ...brand })

    React.useEffect(() => {
        dispatchColumns({ actionType: 'set object', object: brand })
    }, [brand])


    async function submit() {
        apiCallHandler(
            async () => await api.brandEdit(brand?.id, columns),
            (data) => { change(); },
            'EditBrandModal',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.brandsIndex()} />;
    }
    return (
        <CustomModal buttonClass="btn btn-secondary" label={'تعديل'} >

            <div className="card">
                <div className="card-body">

                    <Form.Group className="mb-3">
                        <Form.Label >brand image</Form.Label>
                        <Image className='w-25 d-block mx-auto' onClick={() => { }} src={columns?.image} />
                        <ImagePicker
                            maxSize={200 * 1024}
                            setImage={(base64) => {
                                dispatchColumns({ actionType: 'change property', property: 'image', value: base64 })
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >brand name</Form.Label>
                        <Form.Control type="text" value={columns?.name ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'name', value: e.target.value })} />
                    </Form.Group>

                    <div className=" p-2 m-2 d-flex justify-content-center">
                        <input onClick={submit} type="button" className='btn btn-success' value="تعديل" />
                    </div>

                </div>
            </div>
        </CustomModal>
    )
}