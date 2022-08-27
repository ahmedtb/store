import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditBrandModal from './components/EditBrandModal';

export default function BrandShow(props) {

    const { id } = useParams();
    const [brand, setbrand] = React.useState(null)

    async function getBrandInfo() {
        apiCallHandler(
            async () => await api.brandShow(+id),
            setbrand,
            'BrandShow getBrandInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getBrandInfo()
        }
    }, [id])


    const [redirect, setredirect] = React.useState(false)
    async function deleteBrand() {
        apiCallHandler(
            async () => await api.brandDelete(brand?.id),
            (data) => setredirect(true),
            'Brand Show delete Brand',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.brandsIndex()} />;
    }

    return <div className='p-4 bg-white'>


        <div className="d-flex justify-content-between">
            <div>
                منتج رقم {brand?.id}
            </div>

            <div>
                <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                    <div>
                        {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.brand)}
                    </div>
                    <div className='d-flex justify-content-around my-2'>
                        <button className="btn btn-secondary" onClick={deleteBrand} data-dismiss="modal">{window.localization.yes}</button>
                        <button className='btn btn-success' data-dismiss="modal">لا</button>
                    </div>

                </CustomModal>
                <EditBrandModal brand={brand} change={getBrandInfo} />
            </div>

        </div>



        <Row>
            <Col xs={3}>
                <img src={api.brandImage(+id)} className='w-100' />
            </Col>

            <Col xs={9}>
                <div className='fs-4'>{window.localization.name} {brand?.name}</div>

            </Col>
        </Row>


    </div>
}