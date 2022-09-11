import React from 'react'
import { routes } from '../functions/urls'
import { Col } from 'react-bootstrap';
import { connect } from "react-redux"
import AllowedLink from './AllowedLink';
import localization from '../../functions/localization';
import { refreshAdmin } from '../redux/stateActions';
import { Dispatch } from 'redux';


function SideMenue(props) {


    return <Col xs={2} className='bg-dark text-white p-2 min-vh-100' >

        <AllowedLink className='text-white text-decoration-none' to={routes.home()}>
            <h5 className='text-center'> {localization.controlPanel} </h5>
        </AllowedLink>
        <div className='p-1'>

            <AllowedLink className='text-white text-decoration-none' to={routes.productsIndex()}>
                <h5 className=''> {localization.products} </h5>
            </AllowedLink>

            <AllowedLink className='text-white text-decoration-none' to={routes.categoriesIndex()}>
                <h5 className=''> {localization.categories} </h5>
            </AllowedLink>
            
            <AllowedLink className='text-white text-decoration-none' to={routes.brandsIndex()}>
                <h5 className=''> {localization.brands} </h5>
            </AllowedLink>
            
            <AllowedLink className='text-white text-decoration-none' to={routes.ordersIndex()}>
                <h5 className=''> {localization.orders} </h5>
            </AllowedLink>
                        
            {/* <AllowedLink className='text-white text-decoration-none' to={routes.orderedOrdersIndex()}>
                <h5 className=''> oredered orders </h5>
            </AllowedLink> */}
                        
            <AllowedLink className='text-white text-decoration-none' to={routes.cartsIndex()}>
                <h5 className=''> carts index </h5>
            </AllowedLink>

            <AllowedLink className='text-white text-decoration-none' to={routes.orderItemsIndex()}>
                <h5 className=''> {localization.orderItems} </h5>
            </AllowedLink>
            
            <AllowedLink className='text-white text-decoration-none' to={routes.adminsIndex()}>
                <h5 className=''> {localization.admins} </h5>
            </AllowedLink>
            
            <AllowedLink className='text-white text-decoration-none' to={routes.slidesIndex()}>
                <h5 className=''> {localization.slides} </h5>
            </AllowedLink>
        </div>


    </Col>


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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenue)