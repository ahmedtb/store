import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import ProductsTable from './components/ProductsTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function ProductsIndex() {


    const [productsPagination, setproductsPagination] = React.useState<pagination>()


    async function fetch(params) {
        return await api.productsIndex({ ...getPaginationParams(productsPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    قائمة المنتجات
                </div>
                <div>
                    <AllowedLink to={routes.createProduct()}>تسجيل منتج</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[productsPagination, setproductsPagination]}
                        property={'arabic_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='sellable_category_name'
                        label={window.localization.formatString(window.localization.categoryOf, window.localization.product)}
                        apiCall={fetch}
                        useState={[productsPagination, setproductsPagination]}
                    />
                    <TextFilter
                        apiCall={fetch} useState={[productsPagination, setproductsPagination]}
                        property={'details'}
                        label={window.localization.formatString(window.localization.descriptionOf, window.localization.product)}
                    />
                </Col>
            </Row>

            <div>
                <ProductsTable products={productsPagination.data} />
            </div >
            <Paginator log={'ProductsIndex'} apiCall={fetch} useState={[productsPagination, setproductsPagination]} />
        </Card.Body>
    </Card>

}

