import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import CategoriesTable from './components/CategoriesTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function CategoriesIndex() {


    const [categoriesPagination, setcategoriesPagination] = React.useState<pagination>()


    async function fetch(params) {
        return await api.categoriesIndex({ ...getPaginationParams(categoriesPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    قائمة المنتجات
                </div>
                <div>
                    <AllowedLink to={routes.categoryCreate()}>تسجيل منتج</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[categoriesPagination, setcategoriesPagination]}
                        property={'arabic_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='sellable_category_name'
                        label={window.localization.formatString(window.localization.categoryOf, window.localization.category)}
                        apiCall={fetch}
                        useState={[categoriesPagination, setcategoriesPagination]}
                    />
                    <TextFilter
                        apiCall={fetch} useState={[categoriesPagination, setcategoriesPagination]}
                        property={'details'}
                        label={window.localization.formatString(window.localization.descriptionOf, window.localization.category)}
                    />
                </Col>
            </Row>

            <div>
                <CategoriesTable categories={categoriesPagination.data} />
            </div >
            <Paginator log={'CategoriesIndex'} apiCall={fetch} useState={[categoriesPagination, setcategoriesPagination]} />
        </Card.Body>
    </Card>

}

