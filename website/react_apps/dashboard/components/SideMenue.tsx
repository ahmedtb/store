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
    RiAdvertisementFill, RiAdminFill
} from 'react-icons/ri'
import {
    FaRegUserCircle
} from 'react-icons/fa'

function SideMenue(props) {


    return <Col xs={2} className='bg-dark text-white p-2 min-vh-100 fs-4' >

        <AllowedLink className='text-white text-decoration-none' to={routes.home()}>
            <div className='text-center'> {localization.controlPanel} </div>
        </AllowedLink>
        <div className='p-1'>

            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.productsIndex()}>
                <IoFileTrayStackedSharp size={20} className='ms-2' />
                <div className='me-1'> {localization.products} </div>
            </AllowedLink>

            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.categoriesIndex()}>
                <MdOutlineCategory size={20} className='ms-2' />
                <div className='me-1'> {localization.categories} </div>
            </AllowedLink>
            
            {/* <AllowedLink className='text-white text-decoration-none' to={routes.brandsIndex()}>
                <div className=''> {localization.brands} </div>
            </AllowedLink>
             */}
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.ordersIndex()}>
                <RiOrderPlayFill size={20} className='ms-2' />
                <div className='me-1'> {localization.orders} </div>
            </AllowedLink>
                        
            {/* <AllowedLink className='text-white text-decoration-none' to={routes.orderedOrdersIndex()}>
                <div className=''> oredered orders </div>
            </AllowedLink> */}
                        
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.cartsIndex()}>
                <AiOutlineShoppingCart size={20} className='ms-2' />
                <div className=''>السلات الحالية</div>
            </AllowedLink>

            {/* <AllowedLink className='text-white text-decoration-none' to={routes.orderItemsIndex()}>
                <div className=''> {localization.orderItems} </div>
            </AllowedLink> */}
            
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.adminsIndex()}>
                <RiAdminFill color='white'  size={20} className='ms-2' />
                <div className=''> {localization.admins} </div>
            </AllowedLink>
                        
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.usersIndex()}>
                <FaRegUserCircle size={20} className='ms-2' />
                <div className=''> الزبائن </div>
            </AllowedLink>
            
            <AllowedLink className='text-white text-decoration-none d-flex align-items-center' to={routes.slidesIndex()}>
                <RiAdvertisementFill size={20} className='ms-2' />
                <div className=''> {localization.slides} </div>
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