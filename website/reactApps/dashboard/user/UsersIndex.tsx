import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import UsersTable from './components/UsersTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function UsersIndex() {


    const [usersPagination, setusersPagination] = React.useState<pagination>()


    async function fetch(params) {
        return await api.usersIndex({ ...getPaginationParams(usersPagination), ...params });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>
                    قائمة المنتجات
                </div>
                <div>
                    <AllowedLink to={routes.userCreate()}>تسجيل منتج</AllowedLink>
                </div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>
                <Col>
                    <TextFilter
                        apiCall={fetch} useState={[usersPagination, setusersPagination]}
                        property={'arabic_name'}
                        label={window.localization.name}
                    />

                </Col>
                <Col>
                    <TextFilter
                        property='sellable_category_name'
                        label={window.localization.formatString(window.localization.categoryOf, window.localization.user)}
                        apiCall={fetch}
                        useState={[usersPagination, setusersPagination]}
                    />
                    <TextFilter
                        apiCall={fetch} useState={[usersPagination, setusersPagination]}
                        property={'details'}
                        label={window.localization.formatString(window.localization.descriptionOf, window.localization.user)}
                    />
                </Col>
            </Row>

            <div>
                <UsersTable users={usersPagination.data} />
            </div >
            <Paginator log={'UsersIndex'} apiCall={fetch} useState={[usersPagination, setusersPagination]} />
        </Card.Body>
    </Card>

}

