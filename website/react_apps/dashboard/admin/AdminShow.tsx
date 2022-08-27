import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditAdminModal from './components/EditAdminModal';

export default function AdminShow(props) {

    const { id } = useParams();
    const [admin, setadmin] = React.useState(null)

    async function getAdminInfo() {
        apiCallHandler(
            async () => await api.adminShow(+id),
            setadmin,
            'AdminShow getAdminInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getAdminInfo()
        }
    }, [id])


    const [redirect, setredirect] = React.useState(false)
    async function deleteAdmin() {
        apiCallHandler(
            async () => await api.adminDelete(admin?.id),
            (data) => setredirect(true),
            'Admin Show delete Admin',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.adminsIndex()} />;
    }

    return <div className='p-2'>

        <Card className='my-2'>

            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div>
                        منتج رقم {admin?.id}
                    </div>

                    <div>
                        <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                            <div>
                                {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.admin)}
                            </div>
                            <div className='d-flex justify-content-around my-2'>
                                <button className="btn btn-secondary" onClick={deleteAdmin} data-dismiss="modal">{window.localization.yes}</button>
                                <button className='btn btn-success' data-dismiss="modal">لا</button>
                            </div>

                        </CustomModal>
                        {/* <EditAdminModal admin={admin} change={getAdminInfo} /> */}
                    </div>

                </div>

            </Card.Header>

            <Card.Body>

                <Row>

                    <Col xs={9}>
                        <div className='fs-4'>{window.localization.name} {admin?.name}</div>
                        <div className='fs-4'>{window.localization.username} {admin?.username}</div>

                    </Col>
                </Row>
            </Card.Body>
        </Card>


    </div>
}