import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from '../NotFound'
import routesConfigs from '../functions/routesConfigs'
import { api } from '../functions/urls'
import { refreshAdmin, setAllowedRoutes } from '../redux/stateActions';
import { connect } from "react-redux"
import { intersection } from 'lodash'
import { Dispatch } from 'redux';

const calculateAllowedRoutes = (admin: admin) => {
    const roles = admin?.roles
    return routesConfigs.filter(
        ({ permissions }) => {
            if (!permissions) return true;
            else if (!(Array.isArray(permissions) && permissions.length)) return true;
            else return intersection(permissions, roles).length
        })
}

function AllowedRoutes(props: { admin: admin, allowedRoutes: allowedRoutesType, refreshAdmin: typeof refreshAdmin, setAllowedRoutes: typeof setAllowedRoutes }) {

    async function isLoggedIn() {
        try {

            const response = await api.getAdmin()
            // await delay(2000)
            props.refreshAdmin(response.data)
            console.log('isLoggedIn', response.data)
        } catch (e) { }
    }

    React.useEffect(() => {
        if (props.admin == null) {
            isLoggedIn()
        }
    }, [props.admin])

    React.useEffect(() => {
        if (window.admin)
            props.refreshAdmin(window.admin)
    }, [])

    React.useEffect(() => {
        props.setAllowedRoutes(calculateAllowedRoutes(props.admin))
    }, [props.admin])

    // React.useEffect(() => {
    //     console.log('allowedRoutes', props.allowedRoutes)
    // }, [props.allowedRoutes])

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



const mapStateToProps = (state: { state: dashboardState }) => {
    return {
        admin: state.state.admin,
        allowedRoutes: state.state.allowedRoutes,

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshAdmin: (admin: admin) => dispatch(refreshAdmin(admin)),
        setAllowedRoutes: (allowedRoutes: allowedRoutesType) => dispatch(setAllowedRoutes(allowedRoutes)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedRoutes)