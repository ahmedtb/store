import React from 'react'
import { routes, api } from './urls'
import { refreshNotification } from '../redux/stateActions'
import { connect } from "react-redux"
import AllowedLink from './AllowedLink';
import { useLocation } from 'react-router-dom'
import BellIcon from 'react-bell-icon';
import { stateType } from './types';
import { Dispatch } from 'redux';

function NotificationsBell(props) {
    const location = useLocation();

    const [notificationsPagintation, setnotificationsPagintation] = React.useState()
    const [update, setupdate] = React.useState<number>()
    const [newsign, setnewsign] = React.useState<boolean>()
    const [animate, setanimate] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (props.admin) {
            window.Echo.private('App.Models.Admin.' + props.admin.id)
                .notification((notification) => {
                    props.refreshNotification(notification)
                });

        } else
            setnotificationsPagintation(null)
    }, [props.admin])

    React.useEffect(() => {
        if (location.pathname == '/dashboard/adminNotifications')
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

    return <AllowedLink to={routes.adminNotifications()} className="text-decoration-none" >
        {/* <FaRegBell size={25} color={!newsign ? 'black' : 'yellow'} /> */}
        <BellIcon width='25' active={animate ? true : false} animate={animate} color={!newsign ? 'black' : 'yellow'} />

    </AllowedLink>

}



const mapStateToProps = (state: { state: stateType }) => {
    return {
        user: state.state.user,
        notification: state.state.notification,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshNotification: (notification) => dispatch(refreshNotification(notification)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell)