import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import AdminsTable from './components/AdminsTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function AdminsIndex() {


    const [adminsPagination, setadminsPagination] = React.useState<pagination<admins>>()


    function fetch(params) {
        return api.adminsIndex({ ...getPaginationParams(adminsPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    admins index
                </div>
                <div>
                    <AllowedLink to={routes.adminCreate()}>تسجيل مشرف</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[adminsPagination, setadminsPagination]}
                        property={'name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    
                </Col>
            </Row>

            <div>
                <AdminsTable admins={adminsPagination?.data} />
            </div >
            <Paginator log={'AdminsIndex'} apiCall={fetch} useState={[adminsPagination, setadminsPagination]} />
        </Card.Body>
    </Card>

}

