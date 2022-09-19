import React from 'react'
import { routes, api } from '../functions/urls'
import { Navbar, Nav, NavDropdown, Container, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { refreshAdmin } from '../redux/stateActions';
import { connect } from "react-redux"
import NotificationsBell from '../notification/NotificationsBell';
import apiCallHandler from '../functions/apiCallHandler';
import { Dispatch } from 'redux';


function TopMenue(props: { refreshAdmin: typeof refreshAdmin, admin: admin }) {



    async function logout() {
        apiCallHandler(
            api.logout,
            (data) => props.refreshAdmin(null),
            'TopMenue logout',
            false
        )
    }

    return (
        <Navbar bg="danger" expand="lg" className='py-0 px-0'>
            <Container fluid>
                <LinkContainer to={routes.home()}>
                    <Navbar.Brand className=''>
                        <div className='fs-2 ms-3 text-white'>
                            متجر هواتف
                        </div>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="" id="basic-navbar-nav">



                    <Nav className='fw-bold align-items-center me-auto '>

                        <NotificationsBell />
                        {
                            props.admin ? (
                                <NavDropdown title={props.admin.name}>
                                    <NavDropdown.Item onClick={logout} >{window.localization.logout}</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to={routes.loginPage()}>
                                    <Nav.Link >{window.localization.login}</Nav.Link>
                                </LinkContainer>
                            )
                        }

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)