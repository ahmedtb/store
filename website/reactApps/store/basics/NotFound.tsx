import React from 'react'
import { connect } from "react-redux"
import LoginPage from './LoginPage'
import { Dispatch } from 'redux'

function NotFound(props: { user: userType }) {

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