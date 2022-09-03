import React from 'react'
import { routes, api } from '../functions/urls'
import { refreshNotification } from '../redux/stateActions'
import { connect } from "react-redux"
import AllowedLink from '../components/AllowedLink';
import { useLocation } from 'react-router-dom'
import BellIcon from 'react-bell-icon';
import { Dispatch } from 'redux';

function NotificationsBell(props: { admin: admin, notification: notification, refreshNotification: typeof refreshNotification }) {
    const location = useLocation();

    const [notificationsPagintation, setnotificationsPagintation] = React.useState()
    const [update, setupdate] = React.useState<number>()
    const [newsign, setnewsign] = React.useState<boolean>()
    const [animate, setanimate] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (props.admin) {
            window.Echo.private('App.Models.Admin.' + props.admin.id)
                .notification((notification: notification) => {
                    props.refreshNotification(notification)
                });

        } else
            setnotificationsPagintation(null)
    }, [props.admin])

    React.useEffect(() => {
        if (location.pathname == '/dashboard/notifications')
            setnewsign(false)
    }, [location.pathname, newsign])


    React.useEffect(() => {
        if (props.notification) {
            // console.log('notification',props.notification)

            setupdate(Math.random())
            setnewsign(true)
            setanimate(true)
            setTimeout(() => {
                setanimate(false)
            }, 350);
        }
    }, [props.notification])

    return <AllowedLink to={routes.notifications()} className="text-decoration-none me-2" >
        {/* <FaRegBell size={25} color={!newsign ? 'black' : 'yellow'} /> */}
        <BellIcon width='25' active={animate ? true : false} animate={animate} color={!newsign ? 'white' : 'yellow'} />

    </AllowedLink>

}



const mapStateToProps = (state: { state: dashboardState }) => {
    return {
        admin: state.state.admin,
        notification: state.state.notification,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshNotification: (notification: notification) => dispatch(refreshNotification(notification)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell)