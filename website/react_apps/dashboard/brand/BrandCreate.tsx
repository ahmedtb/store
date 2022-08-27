import React from 'react'
import { api, routes } from '../functions/urls'
import { Navigate } from 'react-router'
import { Form, Card, Image } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import ImagePicker from '../../components/ImagePicker';

export default function BrandCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { image: null })

    React.useEffect(() => {
        // console.log('columns', columns)
    }, [columns])


    function submit() {
        apiCallHandler(
            () => api.brandCreate(columns),
            (data) => { alert(data); setredirect(true) },
            'CreateBrand',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.brandsIndex()} />;
    }
    return (
        <div className="card">
            <Card.Header className='d-flex justify-content-between'>
                <div>تسجيل منتج</div>
                <div>
                    {/* <UploadMultipleBrandsModal  /> */}
                </div>
            </Card.Header>
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
                    <input onClick={submit} type="button" className='btn btn-success' value="تسجيل" />
                </div>

            </div>
        </div>
    )
}