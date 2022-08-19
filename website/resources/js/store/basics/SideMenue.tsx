import React from 'react'
import { routes } from './urls'
import { Col } from 'react-bootstrap';
import { refreshAdmin } from '../redux/stateActions'
import { connect } from "react-redux"
import {
    BsBuilding,
    BsPersonBoundingBox,
    BsFillCreditCard2BackFill,
    BsListOl,
    BsFillGearFill,
    BsPerson,
    BsBell,
    BsChatFill,
    BsDot,
    BsTable
} from 'react-icons/bs'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { MdReportGmailerrorred, MdAttachMoney } from 'react-icons/md'
import AllowedLink from './AllowedLink';


import ToggleList from '../../commonThings/ToggleList';
import localization from '../../commonThings/localization';


function SideMenue(props) {


    if (props.hideSideMenue)
        return null
    else
        return <Col xs={2} className='bg-dark text-white p-2 min-vh-100' >
            <AllowedLink className='text-white text-decoration-none' to={routes.dashboard()}>
                <h5 className='text-center'> {localization.controlPanel} </h5>
            </AllowedLink>

            <div className='p-1'>

                <ToggleList
                    allowedRoutes={props.allowedRoutes}
                    label={<div className='d-flex align-items-center'>
                        <BsTable size={15} />
                        <div className='mx-2'>إدارة الصندوق</div>
                    </div>}


                    links={[
                        { label: 'لوحة المراقبة', to: routes.monitorPanel() },
                        { label: 'كشف حساب', to: routes.accountStatement() },
                        { label: 'كشف بالمستفيدين', to: routes.customersStatement() },
                        { label: 'إستعلام عن مستفيد', to: routes.inspectCustomer() },


                    ]}
                />

                <ToggleList
                    allowedRoutes={props.allowedRoutes}
                    label={<div className='d-flex align-items-center'>
                        <MdAttachMoney color='white' size={20} />
                        <div className='mx-2'>المالية</div>
                    </div>}


                    links={[
                        { label: localization.exchangeRates, to: routes.exchangeRates() },

                        { label: localization.payClaim, to: routes.claimsPaying() },
                        { label: localization.payingMultipleClaims, to: routes.payingMultipleClaims() },

                    ]}
                />

                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.serviceProvidersIndex()}>
                    <div className='d-flex align-items-center'>
                        <BsBuilding size={15} />
                        <div className='mx-2'>{localization.medicalNetwork}</div>
                    </div>
                </AllowedLink>

                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.inActiveServicesIndex()}>
                    <div className='d-flex align-items-center'>
                        <BsBuilding size={15} />
                        <div className='mx-2'>{'خدمات غير مفعلة للمصحات'}</div>
                    </div>
                </AllowedLink>

                <ToggleList
                    allowedRoutes={props.allowedRoutes}
                    label={<div className='d-flex align-items-center'>
                        <BsPersonBoundingBox size={15} />
                        <div className='mx-2'>{localization.doctors}</div>
                    </div>}


                    links={[
                        { label: localization.createDoctor, to: routes.createDoctor() },
                        { label: localization.formatString(localization.listOf, localization.doctors), to: routes.doctorsIndex() },
                        { label: localization.formatString(localization.listOf, localization.doctorAppointments), to: routes.appointmentsIndex() }
                    ]}
                />

                <ToggleList
                    allowedRoutes={props.allowedRoutes}
                    label={<div className='d-flex align-items-center'>
                        <BsBuilding size={15} />
                        <div className='mx-2'>{localization.contractsAndCompanies}</div>
                    </div>}

                    links={[
                        { label: localization.formatString(localization.listOf, localization.companies), to: routes.companiesIndex() },
                        { label: localization.formatString(localization.listOf, localization.contracts), to: routes.contractsIndex() },
                        { label: localization.formatString(localization.listOf, localization.benefits), to: routes.benefitsIndex() },

                    ]}
                />



                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.customersIndex()}>
                    <div className='d-flex align-items-center'>
                        <BsFillCreditCard2BackFill size={15} />
                        <div className='mx-2'>{localization.customers}</div>
                    </div>
                </AllowedLink>

                <ToggleList
                    allowedRoutes={props.allowedRoutes}
                    label={<div className='d-flex align-items-center'>
                        <BsListOl size={15} />
                        <div className='mx-2'>{localization.claimsAndBills}</div>
                    </div>}


                    links={[
                        { label: localization.formatString(localization.create, localization.claim), to: routes.createClaim() },
                        { label: localization.formatString(localization.listOf, localization.claims), to: routes.claimsIndex() },
                        { label: localization.receiveClaims, to: routes.claimsReception() },
                        { label: localization.reviewClaims, to: routes.claimsReviewing() },

                        { label: localization.formatString(localization.listOf, localization.bills), to: routes.billsIndex() },
                        { label: 'قائمة فواتير الادوية', to: routes.medicineBillsIndex() },
                        { label: localization.specialBills, to: routes.specialBillsIndex() }

                    ]}
                />


                <ToggleList
                    allowedRoutes={props.allowedRoutes}
                    label={<div className='d-flex align-items-center'>
                        <BsFillGearFill size={15} />
                        <div className='mx-2'>{localization.servicesAndMedicinces}</div>
                    </div>}


                    links={[
                        { label: localization.formatString(localization.listOf, localization.services), to: routes.servicesIndex() },
                        { label: localization.formatString(localization.listOf, localization.medicines), to: routes.medicinesIndex() },
                        { label: localization.formatString(localization.listOf, localization.categories), to: routes.sellableCategoriesIndex() },

                    ]}
                />

                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.chatPanel()}>
                    <div className='d-flex align-items-center'>
                        <BsChatFill size={15} />
                        <div className='mx-2'>{localization.chats}</div>
                    </div>
                </AllowedLink>

                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.usersIndex()}>
                    <div className='d-flex align-items-center'>
                        <BsPerson size={15} />
                        <div className='mx-2'>{localization.companiesAndProvidersUsers}</div>
                    </div>
                </AllowedLink>


                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.adminsIndex()}>
                    <div className='d-flex align-items-center'>
                        <BsPerson size={15} />
                        <div className='mx-2'>{localization.dashboardUsers}</div>
                    </div>
                </AllowedLink>


                <ToggleList
                    allowedRoutes={props.allowedRoutes}
                    label={<div className='d-flex align-items-center'>
                        <BsBell size={15} />
                        <div className='mx-2'>{localization.notifications}</div>
                    </div>}


                    links={[
                        { label: localization.allNotifications, to: routes.notificationsIndex() },
                        { label: localization.myNotifications, to: routes.adminNotifications() },

                    ]}
                />

                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.activityLogsIndex()}>
                    <div className='d-flex align-items-center'>
                        <BsPerson size={15} />
                        <div className='mx-2'>{localization.usersActivities}</div>
                    </div>
                </AllowedLink>


                {/* <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.dashboard()}>
                    <div className='d-flex align-items-center'>
                        <MdReportGmailerrorred size={15} />
                        <div className='mx-2'>{'تقارير عن أخطاء ممكنة'}</div>
                    </div>
                </AllowedLink> */}
                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.claimsOperationsStatistics()}>
                    <div className='d-flex align-items-center'>
                        <MdReportGmailerrorred size={15} />
                        <div className='mx-2'>{'احصائيات علميات المطالبات'}</div>
                    </div>
                </AllowedLink>
                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.openAdmissionClaims()}>
                    <div className='d-flex align-items-center'>
                        <AiOutlineFolderOpen size={15} />
                        <div className='mx-2'>{'مطالبات الايواء المفتوحة'}</div>
                    </div>
                </AllowedLink>

                <AllowedLink className='my-2 text-decoration-none text-white on-hover-text-green' to={routes.thisAdmin()}>
                    <div className='d-flex align-items-center'>
                        <BsDot size={20} />
                        <div className='mx-2'>{'هذا المستخدم'}</div>
                    </div>
                </AllowedLink>

            </div>


        </Col>


}

const mapStateToProps = state => {
    return {
        admin: state.state.admin,
        hideSideMenue: state.state.hideSideMenue,
        allowedRoutes: state.state.allowedRoutes,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshAdmin: (admin) => dispatch(refreshAdmin(admin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenue)