import React from 'react'
import { routes } from '../functions/urls'
import { Col } from 'react-bootstrap';
import { connect } from "react-redux"
import AllowedLink from './AllowedLink';
import localization from '../../functions/localization';
import { refreshUser } from '../redux/stateActions';
import { Dispatch } from 'redux';


function SideMenue(props) {


    return <Col xs={2} className='bg-dark text-white p-2 min-vh-100' >

        <AllowedLink className='text-white text-decoration-none' to={routes.home()}>
            <h5 className='text-center'> {localization.controlPanel} </h5>
        </AllowedLink>
        <div className='p-1'>

            <AllowedLink className='text-white text-decoration-none' to={routes.productsIndex()}>
                <h5 className='text-center'> {localization.products} </h5>
            </AllowedLink>

            <AllowedLink className='text-white text-decoration-none' to={routes.categoriesIndex()}>
                <h5 className='text-center'> {localization.categories} </h5>
            </AllowedLink>
            
            <AllowedLink className='text-white text-decoration-none' to={routes.brandsIndex()}>
                <h5 className='text-center'> {localization.brands} </h5>
            </AllowedLink>
        </div>


    </Col>


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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenue)