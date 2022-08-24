import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import ProductsTable from './components/ProductsTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function ProductsIndex() {


    const [productsPagination, setproductsPagination] = React.useState<pagination>()


    function fetch(params) {
        return api.productsIndex({ ...getPaginationParams(productsPagination), ...params });
    }

    return <div className='p-3 bg-white'>
        <div className='d-flex justify-content-between'>
            <div className='fs-4'>
                {window.localization.productsList}
            </div>
            <div>
                <AllowedLink to={routes.createProduct()}>{window.localization.createProduct}</AllowedLink>
            </div>
        </div>

        <div className='row align-items-center'>
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
                    label={window.localization.category}
                    apiCall={fetch}
                    useState={[productsPagination, setproductsPagination]}
                />
                <TextFilter
                    apiCall={fetch} useState={[productsPagination, setproductsPagination]}
                    property={'details'}
                    label={window.localization.description}
                />
            </Col>
        </div>

        <div>
            <ProductsTable products={productsPagination?.data} />
        </div >
        <Paginator log={'ProductsIndex'} apiCall={fetch} useState={[productsPagination, setproductsPagination]} />
    </div>

}

