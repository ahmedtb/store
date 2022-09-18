import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import { Card, Col, Row } from 'react-bootstrap';
import { connect } from "react-redux"
import moment from 'moment';
import { BsDot } from 'react-icons/bs'
import { refreshNotification } from '../redux/stateActions'
import { Dispatch } from 'redux';
import { useNavigate } from "react-router-dom"
import apiCallHandler from '../functions/apiCallHandler';

function ListNotifications(props: { notifications: notifications }) {
    const notifications = props.notifications
    const navigate = useNavigate()

    function markAsReaded(notification: notification) {
        apiCallHandler(
            () => { return api.markAsReaded(notification.id) },
            (data) => { navigate(notification.data.to) },
            'markAsReaded',
            true
        )
    }

    if (notifications?.length)
        return <div>
            {
                notifications?.map((notification, index) => <div key={index} className='border rounded my-2 p-1' >
                    <div className='d-flex align-items-center text-primary cursor-pointer' onClick={() => markAsReaded(notification)}>
                        {/* <div  onClick={() => markAsReaded(notification)}> */}
                        <div>
                            {notification.read_at ? null : <BsDot size={40} />}
                        </div>
                        <div>{notification.data?.title}</div>
                        {/* </div> */}
                    </div>
                    <div className=''>{notification.data?.message}</div>
                    <div className='d-flex justify-content-between mx-2'>
                        <div className=''>{moment(notification.created_at).fromNow()}</div>
                        <div className='me-auto'>
                            {moment(notification.created_at).format('Y-MM-DD  H:mm')}
                        </div>
                    </div>

                </div>)
            }

        </div>
    else return <div></div>
}

function Notifications(props: { admin: admin, notification: notification, refreshNotification: typeof refreshNotification }) {

    const [update, setupdate] = React.useState<number>()
    const audio = new Audio('/sounds/mixkit-bell-notification-933.wav');

    React.useEffect(() => {
        if (props.notification) {

            audio.volume = 1;

            audio.play()
            setupdate(Math.random())
            props.refreshNotification(null)
        }

    }, [props.notification])

    const [notificationsPagination, setnotificationsPagination] = React.useState<pagination<notifications>>()


    function fetch(params: object) {
        return api.notificationsIndex({
            ...params, latest: true
        });
    }
    return <div className='p-3 m-2 bg-white rounded shadow' >
        <div className='fs-4 fw-bold'>الإشعارات</div>
        <div className='col-5'>

            <ListNotifications notifications={notificationsPagination?.data} />
        </div>

        <Paginator update={update} includeURLSearchParams={true} log={'NotificationsIndex'} apiCall={fetch} useState={[notificationsPagination, setnotificationsPagination]} />
    </div>

}

const mapStateToProps = (state: { state: dashboardState }) => {
    return {
        admin: state.state.admin,
        notification: state.state.notification,

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshNotification: (not) => dispatch(refreshNotification(not))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
