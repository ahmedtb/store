import React from 'react'
import { routes } from '../functions/urls'
import { Col } from 'react-bootstrap';
import { connect } from "react-redux"
import AllowedLink from './AllowedLink';
import localization from '../../functions/localization';
import { refreshAdmin } from '../redux/stateActions';
import { Dispatch } from 'redux';
import {
    IoFileTrayStackedSharp
} from 'react-icons/io5'
import {
    MdOutlineCategory
} from 'react-icons/md'
import {
    RiOrderPlayFill
} from 'react-icons/ri'
import {
    AiOutlineShoppingCart
} from 'react-icons/ai'
import {
    GrUserAdmin
} from 'react-icons/gr'
import {
    RiAdvertisementFill
} from 'react-icons/ri'

function SideMenue(props) {


    return <Col xs={2} className='bg-dark text-white p-2 min-vh-100' >

        <AllowedLink className='text-white text-decoration-none' to={routes.home()}>
            <h5 className='text-center'> {localization.controlPanel} </h5>
        </AllowedLink>
        <div className='p-1'>

            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.productsIndex()}>
                <IoFileTrayStackedSharp size={20} />
                <h5 className='me-1'> {localization.products} </h5>
            </AllowedLink>

            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.categoriesIndex()}>
                <MdOutlineCategory size={20} />
                <h5 className='me-1'> {localization.categories} </h5>
            </AllowedLink>
            
            {/* <AllowedLink className='text-white text-decoration-none' to={routes.brandsIndex()}>
                <h5 className=''> {localization.brands} </h5>
            </AllowedLink>
             */}
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.ordersIndex()}>
                <RiOrderPlayFill size={20} />
                <h5 className='me-1'> {localization.orders} </h5>
            </AllowedLink>
                        
            {/* <AllowedLink className='text-white text-decoration-none' to={routes.orderedOrdersIndex()}>
                <h5 className=''> oredered orders </h5>
            </AllowedLink> */}
                        
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.cartsIndex()}>
                <AiOutlineShoppingCart size={20} />
                <h5 className=''>السلات الحالية</h5>
            </AllowedLink>

            {/* <AllowedLink className='text-white text-decoration-none' to={routes.orderItemsIndex()}>
                <h5 className=''> {localization.orderItems} </h5>
            </AllowedLink> */}
            
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.adminsIndex()}>
                <GrUserAdmin  size={20} />
                <h5 className=''> {localization.admins} </h5>
            </AllowedLink>
            
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.slidesIndex()}>
                <RiAdvertisementFill size={20} />
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