import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditSlideModal from './components/EditSlideModal';

export default function SlideShow(props) {

    const { id } = useParams();
    const [slide, setslide] = React.useState(null)

    async function getSlideInfo() {
        apiCallHandler(
            async () => await api.slideShow(+id),
            setslide,
            'SlideShow getSlideInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getSlideInfo()
        }
    }, [id])


    const [redirect, setredirect] = React.useState(false)
    async function deleteSlide() {
        apiCallHandler(
            () => api.slideDelete(slide?.id),
            (data) => setredirect(true),
            'Slide Show delete Slide',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.slidesIndex()} />;
    }

    return <div className='p-4'>







        <Row>
            <Col xs={2}>
                <img src={api.slideImage(+id)} className='w-100' />
            </Col>

            <Col xs={9}>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.to}
                    </div>
                    <div>
                        {slide?.to}
                    </div>
                </div>
               
                <div>
                    <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                        <div>
                            {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.slide)}
                        </div>
                        <div className='d-flex justify-content-around my-2'>
                            <button className="btn btn-secondary" onClick={deleteSlide} data-dismiss="modal">{window.localization.yes}</button>
                            <button className='btn btn-success' data-dismiss="modal">{window.localization.no}</button>
                        </div>

                    </CustomModal>
                    <EditSlideModal slide={slide} change={getSlideInfo} />
                </div>
            </Col>
        </Row>


    </div>
}