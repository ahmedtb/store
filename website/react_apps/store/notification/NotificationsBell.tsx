import React from 'react'
import { routes, api } from '../functions/urls'
import { refreshNotification } from '../redux/stateActions'
import { connect } from "react-redux"
import AllowedLink from '../components/AllowedLink';
import { useLocation } from 'react-router-dom'
import { Dispatch } from 'redux';
import {
    AiOutlineBell
} from 'react-icons/ai'
import BellIcon from 'react-bell-icon';

function NotificationsBell(props: { user: user, notification: notification, refreshNotification: typeof refreshNotification }) {
    const location = useLocation();

    const [notificationsPagintation, setnotificationsPagintation] = React.useState()
    const [update, setupdate] = React.useState<number>()
    const [newsign, setnewsign] = React.useState<boolean>()
    const [animate, setanimate] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (props.user) {
            window.Echo.private('App.Models.User.' + props.user.id)
                .notification((notification: notification) => {
                    props.refreshNotification(notification)
                });

        } else
            setnotificationsPagintation(null)
    }, [props.user])

    React.useEffect(() => {
        if (location.pathname == '/notifications')
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
        <BellIcon width='25'
            active={animate ? true : false} 
            animate={animate} 
            color={!newsign ? 'white' : 'yellow'}
        />

    </AllowedLink>

}



const mapStateToProps = (state: { state: storeState }) => {
    return {
        user: state.state.user,
        notification: state.state.notification,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshNotification: (notification: notification) => dispatch(refreshNotification(notification)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell)