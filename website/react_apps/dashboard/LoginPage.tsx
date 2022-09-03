import React from 'react'
import { api, routes } from './functions/urls'
import { Navigate } from 'react-router-dom'
import apiCallHandler from './functions/apiCallHandler';
import { refreshAdmin } from './redux/stateActions'
import { connect } from "react-redux"
import { Dispatch } from 'redux';

function LoginPage(props: { admin: admin, refreshAdmin: typeof refreshAdmin }) {
    const [username, setusername] = React.useState('')
    const [password, setpassword] = React.useState('')

    async function handleLogin(username: string, password: string) {
        apiCallHandler(
            async () => await api.login(username, password),
            (data) => { props.refreshAdmin(data); },
            'dashboard login page',
            true
        )
    }

    if (props.admin) {
        return <Navigate to={routes.home()} />
    }

    return (
        <div className='col-5 mx-auto p-3'>
            <div className='card'>
                <div className='card-header text-center fs-5'>{window.localization.controlPanel}</div>
                <div className='card-body'>
                    <input
                        type='username'
                        className='form-control my-2'
                        placeholder={window.localization.username}
                        onChange={e => setusername(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleLogin(username, password)}
                    />

                    <input
                        type='password'
                        className='form-control my-2'
                        onChange={e => setpassword(e.target.value)}
                        placeholder={window.localization.password}
                        onKeyPress={e => e.key === 'Enter' && handleLogin(username, password)}
                    />
                    <button type="button" className="btn btn-success w-100 my-1" onClick={() => handleLogin(username, password)}>{window.localization.login}</button>

                </div>
            </div>

        </div>
    )
}



const mapStateToProps = (state: { state: dashboardState }) => {
    return {
        admin: state.state.admin,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshAdmin: (admin: admin) => dispatch(refreshAdmin(admin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)