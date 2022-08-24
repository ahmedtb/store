import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditUserModal from './components/EditUserModal';

export default function UserShow(props) {

    const { id } = useParams();
    const [user, setuser] = React.useState(null)

    async function getUserInfo() {
        apiCallHandler(
            async () => await api.userShow(+id),
            setuser,
            'UserShow getUserInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getUserInfo()
        }
    }, [id])


    const [redirect, setredirect] = React.useState(false)
    async function deleteUser() {
        apiCallHandler(
            async () => await api.userDelete(user?.id),
            (data) => setredirect(true),
            'User Show delete User',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.usersIndex()} />;
    }

    return <div className='p-2'>

        <Card className='my-2'>

            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div>
                        منتج رقم {user?.id}
                    </div>

                    <div>
                        <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                            <div>
                                {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.user)}
                            </div>
                            <div className='d-flex justify-content-around my-2'>
                                <button className="btn btn-secondary" onClick={deleteUser} data-dismiss="modal">{window.localization.yes}</button>
                                <button className='btn btn-success' data-dismiss="modal">لا</button>
                            </div>

                        </CustomModal>
                        <EditUserModal user={user} change={getUserInfo} />
                    </div>

                </div>

            </Card.Header>

            <Card.Body>


                <div className='fs-4'>{window.localization.name} {user?.name}</div>
                <div className='fs-4'>{window.localization.price} {user?.price}</div>
                <div className='fs-4'>  {window.localization.category} {user?.category?.name}</div>
                <div className='fs-4'>  {window.localization.description} {user?.description}</div>

            </Card.Body>
        </Card>


    </div>
}