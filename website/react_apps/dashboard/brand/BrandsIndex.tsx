import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import BrandsTable from './components/BrandsTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function BrandsIndex() {


    const [brandsPagination, setbrandsPagination] = React.useState<pagination>()


    async function fetch(params) {
        return await api.brandsIndex({ ...getPaginationParams(brandsPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    قائمة المنتجات
                </div>
                <div>
                    <AllowedLink to={routes.brandCreate()}>تسجيل منتج</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[brandsPagination, setbrandsPagination]}
                        property={'arabic_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='sellable_category_name'
                        label={window.localization.formatString(window.localization.categoryOf, window.localization.brand)}
                        apiCall={fetch}
                        useState={[brandsPagination, setbrandsPagination]}
                    />
                    <TextFilter
                        apiCall={fetch} useState={[brandsPagination, setbrandsPagination]}
                        property={'details'}
                        label={window.localization.formatString(window.localization.descriptionOf, window.localization.brand)}
                    />
                </Col>
            </Row>

            <div>
                <BrandsTable brands={brandsPagination.data} />
            </div >
            <Paginator log={'BrandsIndex'} apiCall={fetch} useState={[brandsPagination, setbrandsPagination]} />
        </Card.Body>
    </Card>

}

