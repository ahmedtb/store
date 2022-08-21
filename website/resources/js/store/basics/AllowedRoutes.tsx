import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from './NotFound'
import routesConfigs from './routesConfigs'
import { api } from './urls'
import { refreshUser, setAllowedRoutes } from '../redux/stateActions';
import { connect } from "react-redux"
import { intersection } from 'lodash'
import { stateType, userType, routeConfigsType, allowedRoutesType } from './types'
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

function AllowedRoutes(props) {

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

    return (
        <>
            <Routes>
                {
                    props.allowedRoutes.map((route, index) => {
                        return <Route
                            key={index}
                            exact={route.exact}
                            title={route.title}
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