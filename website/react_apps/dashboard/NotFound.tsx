import React from 'react'
import { connect } from "react-redux"
import LoginPage from './LoginPage'
import { Dispatch } from 'redux'

function NotFound(props: { admin: admin }) {

    if (!props.admin) {
        return <LoginPage />
    }

    return (
        <h2>
            404 Not Found
        </h2>
    )
}


const mapStateToProps = (state: { state: dashboardState }) => {
    return {
        admin: state.state.admin,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)