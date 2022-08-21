import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from "react-redux"
import LoginPage from './LoginPage'
import { stateType } from './types'
import { Dispatch } from 'redux'

function NotFound(props) {

    if (!props.user) {
        return <LoginPage />
    }

    return (
        <h2>
            404 Not Found
        </h2>
    )
}


const mapStateToProps = (state: { state: stateType }) => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)