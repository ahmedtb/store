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

export default function EditSlideModal(props: { slide: slide, change: () => void }) {
    const slide = props.slide
    const change = props.change


    const [columns, dispatchColumns] = React.useReducer(objectUseReducerFunction, { ...slide })

    React.useEffect(() => {
        dispatchColumns({ actionType: 'set object', object: slide })
    }, [slide])


    async function submit() {
        apiCallHandler(
            async () => await api.slideEdit(slide?.id, columns),
            (data) => { change(); alert(data) },
            'EditSlideModal',
            true
        )
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Navigate to={routes.slidesIndex()} />;
    }
    return (
        <CustomModal buttonClass="btn btn-secondary" label={window.localization.edit} >



            <Form.Group className="mb-3">
                <Form.Label >slide image</Form.Label>
                <Image className='w-25 d-block mx-auto' onClick={() => { }} src={columns?.image ?? api.slideImage(columns?.id)} />
                <ImagePicker
                    maxSize={200 * 1024}
                    setImage={(base64) => {
                        dispatchColumns({ actionType: 'change property', property: 'image', value: base64 })
                    }}
                />
            </Form.Group>




            <Form.Group className="mb-3">
                <Form.Label >slide to</Form.Label>
                <Form.Control type="text" value={columns?.to} onChange={(e) => dispatchColumns({ actionType: 'change property', property: 'to', value: e.target.value })} />
            </Form.Group>

            <div className=" p-2 m-2 d-flex justify-content-center">
                <input onClick={submit} type="button" className='btn btn-success' value="تعديل" />
            </div>
        </CustomModal>
    )
}