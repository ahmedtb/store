import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from "react-redux"
import LoginPage from './LoginPage'

function NotFound(props){

    if (!props.user) {
        return <LoginPage />
    }

    return (
        <h2>
            404 Not Found
        </h2>
    )
}


const mapStateToProps = state => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)