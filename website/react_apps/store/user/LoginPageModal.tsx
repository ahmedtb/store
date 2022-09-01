import React from 'react'
import { api, routes } from '../functions/urls'
import { Navigate } from 'react-router-dom'
import apiCallHandler from '../functions/apiCallHandler';
import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import CustomModal from '../../components/CustomModal';

function LoginPageModal(props: { user: user, refreshUser: typeof refreshUser, children: childrenType, label: string }) {
    const [phone, setphone] = React.useState('')
    const [password, setpassword] = React.useState('')

    async function handleLogin(phone: string, password: string) {
        apiCallHandler(
            async () => await api.login(phone, password),
            (response) => { props.refreshUser(response.data); },
            'dashboard login page',
            true
        )
    }

    if (props.user)
        return props.children
    else
        return (
            <CustomModal label={props.label} buttonClass='btn btn-success'>

                <div className='col-5 mx-auto p-3'>
                    <div className=''>
                        <div>please login first</div>
                        <input
                            type='username'
                            className='form-control my-2'
                            placeholder={window.localization.phone}
                            onChange={e => setphone(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleLogin(phone, password)}
                        />

                        <input
                            type='password'
                            className='form-control my-2'
                            onChange={e => setpassword(e.target.value)}
                            placeholder={window.localization.password}
                            onKeyPress={e => e.key === 'Enter' && handleLogin(phone, password)}
                        />
                        <button type="button" className="btn btn-success w-100 my-1" onClick={() => handleLogin(phone, password)}>{window.localization.login}</button>

                    </div>

                </div>
            </CustomModal>

        )
}



const mapStateToProps = (state: { state: storeState }) => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshUser: (user: user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageModal)