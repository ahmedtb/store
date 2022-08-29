import React from 'react'
import { routes, api } from '../functions/urls'
import { Navbar, Nav, NavDropdown, Container, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { refreshUser } from '../redux/stateActions';
import { connect } from "react-redux"
import NotificationsBell from './NotificationsBell';
import apiCallHandler from '../functions/apiCallHandler';
import { Dispatch } from 'redux';


function TopMenue(props: { refreshUser: typeof refreshUser, user: user }) {



    async function logout() {
        apiCallHandler(
            api.logout,
            (data) => props.refreshUser(null),
            'TopMenue logout',
            false
        )
    }

    return (
        <Navbar bg="secondary" expand="lg" className='py-0 px-0'>
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="row align-items-center" id="basic-navbar-nav">


                    <div className="col d-flex justify-content-between align-items-center">

                        <div className='me-auto'>
                            <Nav className='fw-bold align-items-center'>

                                <NotificationsBell />
                                {
                                    props.user ? (
                                        <NavDropdown title={props.user.name}>
                                            <NavDropdown.Item onClick={logout} >{window.localization.logout}</NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <LinkContainer to={routes.loginPage()}>
                                            <Nav.Link >{window.localization.login}</Nav.Link>
                                        </LinkContainer>
                                    )
                                }

                            </Nav>
                        </div>
                    </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


const mapStateToProps = (state: { state: dashboardState }) => {
    return {
        user: state.state.user,
        allowedRoutes: state.state.allowedRoutes,

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        refreshUser: (user: user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)