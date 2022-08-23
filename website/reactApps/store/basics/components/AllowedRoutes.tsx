import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from '../NotFound'
import routesConfigs from '../utility/routesConfigs'
import { api } from '../utility/urls'
import { refreshUser, setAllowedRoutes } from '../../redux/stateActions';
import { connect } from "react-redux"
import { intersection } from 'lodash'
import { Dispatch } from 'redux';

const calculateAllowedRoutes = (user: userType) => {
    const roles = user?.roles
    return routesConfigs.filter(
        ({ permissions }) => {
            if (!permissions) return true;
            else if (!(Array.isArray(permissions) && permissions.length)) return true;
            else return intersection(permissions, roles).length
        })
}

function AllowedRoutes(props: { user: userType, allowedRoutes: allowedRoutesType, refreshUser: typeof refreshUser, setAllowedRoutes: typeof setAllowedRoutes }) {

    async function isLoggedIn() {
        try {

            const response = await api.getUser()
            // await delay(2000)
            props.refreshUser(response.data)
            console.log('isLoggedIn', response.data)
        } catch (e) { }
    }

    React.useEffect(() => {
        if (props.user == null) {
            isLoggedIn()
        }
    }, [props.user])

    React.useEffect(() => {
        if (window.user)
            props.refreshUser(window.user)
    }, [])

    React.useEffect(() => {
        props.setAllowedRoutes(calculateAllowedRoutes(props.user))
    }, [props.user])

    React.useEffect(() => {
        console.log('allowedRoutes', props.allowedRoutes)
    }, [props.allowedRoutes])

    return (
        <>
            <Routes>
                {
                    props.allowedRoutes.map((route: routeType, index: number) => {
                        return <Route
                            key={index}
                            path={route.path}
                            element={<route.component />}
                        />
                    })
                }
                <Route path="*" element={<NotFound />} />

            </Routes>
        </>

    )
}



const mapStateToProps = (state: { state: stateType }) => {
    return {
        user: state.state.user,
        allowedRoutes: state.state.allowedRoutes,

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshUser: (user: userType) => dispatch(refreshUser(user)),
        setAllowedRoutes: (allowedRoutes: allowedRoutesType) => dispatch(setAllowedRoutes(allowedRoutes)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedRoutes)