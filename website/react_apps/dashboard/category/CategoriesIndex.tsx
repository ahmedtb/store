import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import CategoriesTable from './components/CategoriesTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function CategoriesIndex() {


    const [categoriesPagination, setcategoriesPagination] = React.useState<pagination>()


    function fetch(params) {
        return api.categoriesIndex({ ...getPaginationParams(categoriesPagination), ...params, with: 'parent' });
    }

    return <div className='p-5'>
        <div className='d-flex justify-content-between'>
            <div>
                {window.localization.categories}
            </div>
            <div>
                <AllowedLink to={routes.categoryCreate()}>create category</AllowedLink>
            </div>
        </div>
        <Row className='align-items-center'>
            <Col>
                <TextFilter
                    apiCall={fetch} useState={[categoriesPagination, setcategoriesPagination]}
                    property={'name'}
                    label={window.localization.name}
                />

            </Col>
            <Col>
                <TextFilter
                    apiCall={fetch} useState={[categoriesPagination, setcategoriesPagination]}
                    property={'parent_name'}
                    label={window.localization.parent}
                />
            </Col>
        </Row>

        <div>
            <CategoriesTable categories={categoriesPagination?.data} />
        </div >
        <Paginator log={'CategoriesIndex'} apiCall={fetch} useState={[categoriesPagination, setcategoriesPagination]} />
    </div>

}

