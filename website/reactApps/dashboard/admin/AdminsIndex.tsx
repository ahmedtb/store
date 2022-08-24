import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import AdminsTable from './components/AdminsTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function AdminsIndex() {


    const [adminsPagination, setadminsPagination] = React.useState<pagination>()


    async function fetch(params) {
        return await api.adminsIndex({ ...getPaginationParams(adminsPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    قائمة المنتجات
                </div>
                <div>
                    <AllowedLink to={routes.adminCreate()}>تسجيل منتج</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[adminsPagination, setadminsPagination]}
                        property={'arabic_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='sellable_category_name'
                        label={window.localization.formatString(window.localization.categoryOf, window.localization.admin)}
                        apiCall={fetch}
                        useState={[adminsPagination, setadminsPagination]}
                    />
                    <TextFilter
                        apiCall={fetch} useState={[adminsPagination, setadminsPagination]}
                        property={'details'}
                        label={window.localization.formatString(window.localization.descriptionOf, window.localization.admin)}
                    />
                </Col>
            </Row>

            <div>
                <AdminsTable admins={adminsPagination.data} />
            </div >
            <Paginator log={'AdminsIndex'} apiCall={fetch} useState={[adminsPagination, setadminsPagination]} />
        </Card.Body>
    </Card>

}

