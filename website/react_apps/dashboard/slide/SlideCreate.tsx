import React from 'react'
import { api, routes } from '../functions/urls'

import { Navigate } from 'react-router'
import { Form, Card, Image, Col, Row } from 'react-bootstrap';
import objectUseReducerFunction from '../../functions/objectUseReducerFunction'
import apiCallHandler from '../functions/apiCallHandler'
import SelectWithApiSearch from '../../components/SelectWithApiSearch'
// import UploadMultipleSlidesModal from './components/UploadMultipleSlidesModal';
import ImagePicker from '../../components/ImagePicker';
import localization from '../../functions/localization';

export default function SlideCreate() {


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { image: null })

    React.useEffect(() => {
        // console.log('columns', columns)
    }, [columns])


    async function submit() {
        apiCallHandler(
            () => api.createSlide(columns),
            (data) => setredirect(true),
            'CreateSlide',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.slidesIndex()} />;
    }
    return (
        <div className='p-4 bg-white'>
            <div className='fs-5 fw-bold'>إنشاء إعلان</div>

            <Col xs={4} className='mx-auto'>

                <Form.Group className="mb-3">
                    <Form.Label >صورة لاعلان</Form.Label>
                    <Image className='w-25 d-block mx-auto' onClick={() => { }} src={columns?.image} />
                    <ImagePicker
                        maxSize={1000 * 1024}
                        setImage={(base64) => {
                            dispatchColumns({ actionType: 'change property', property: 'image', value: base64 })
                        }}
                    />
                </Form.Group>



                <Form.Group className="mb-3">
                    <Form.Label >الى العنوان</Form.Label>
                    <Form.Control type="text" value={columns?.to ?? ''} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'to', value: e.target.value })} />
                </Form.Group>



            </Col>

            <div className=" p-2 m-2 d-flex justify-content-center">
                <input onClick={submit} type="button" className='btn btn-success' value="إنشاء" />
            </div>

        </div>
    )
}