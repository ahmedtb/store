import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import { Card, Col, Row } from 'react-bootstrap';
import { connect } from "react-redux"
import moment from 'moment';
import { BsDot } from 'react-icons/bs'
import { refreshNotification } from '../redux/stateActions'
import { Dispatch } from 'redux';

function ListNotifications(props) {
    const notifications = props.notifications


    if (notifications?.length)
        return notifications?.map((notification, index) => <div key={index} className='border rounded my-2 p-1' >
            <div >
                {/* <div  onClick={() => markAsReaded(notification)}> */}
                <div>
                    {notification.read_at ? null : <BsDot size={40} />}
                </div>
                {notification.data?.title}
                {/* </div> */}
            </div>
            <div className=''>{notification.data?.message}</div>
            <div className=''>{moment(notification.created_at).fromNow()}</div>
            <div className='me-auto'>
                {moment(notification.created_at).format('Y-MM-DD  H:mm:s')}
            </div>

        </div>)
    else return null
}

function Notifications(props) {

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

    const [notificationsPagination, setnotificationsPagination] = React.useState<pagination<notification>>()


    function fetch(params: object) {
        return api.notificationsIndex({
            ...params, latest: true
        });
    }

    return <Card className='my-2 shadow' >
        <Card.Header>
            <div className='d-flex justify-content-between'>
                <div>notifications</div>
            </div>
        </Card.Header>
        <Card.Body>
            <Row className='align-items-center'>

            </Row>

            <Col xs={12} >
                <ListNotifications notifications={notificationsPagination?.data} />
            </Col >
            <Paginator update={update} includeURLSearchParams={true} log={'NotificationsIndex'} apiCall={fetch} useState={[notificationsPagination, setnotificationsPagination]} />
        </Card.Body>
    </Card>

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
