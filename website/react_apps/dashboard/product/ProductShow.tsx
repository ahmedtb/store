import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditProductModal from './components/EditProductModal';

export default function ProductShow(props) {

    const { id } = useParams();
    const [product, setproduct] = React.useState(null)

    async function getProductInfo() {
        apiCallHandler(
            async () => await api.productShow(+id),
            setproduct,
            'ProductShow getProductInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getProductInfo()
        }
    }, [id])


    const [redirect, setredirect] = React.useState(false)
    async function deleteProduct() {
        apiCallHandler(
            () => api.productDelete(product?.id),
            (data) => setredirect(true),
            'Product Show delete Product',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.productsIndex()} />;
    }

    return <div className='p-4'>







        <Row>
            <Col xs={2}>
                <img src={api.productImage(+id)} className='w-100' />
            </Col>

            <Col xs={9}>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.name}
                    </div>
                    <div>
                        {product?.name}
                    </div>
                </div>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.price}
                    </div>
                    <div>
                        {product?.price}
                    </div>
                </div>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.category}
                    </div>
                    <div>
                        {product?.category?.name}
                    </div>
                </div>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.quantity}
                    </div>
                    <div>
                        {product?.quantity}
                    </div>
                </div>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.description}
                    </div>
                    <div>
                        {product?.description}
                    </div>
                </div>
                <div>
                    <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                        <div>
                            {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.product)}
                        </div>
                        <div className='d-flex justify-content-around my-2'>
                            <button className="btn btn-secondary" onClick={deleteProduct} data-dismiss="modal">{window.localization.yes}</button>
                            <button className='btn btn-success' data-dismiss="modal">{window.localization.no}</button>
                        </div>

                    </CustomModal>
                    <EditProductModal product={product} change={getProductInfo} />
                </div>
            </Col>
        </Row>


    </div>
}