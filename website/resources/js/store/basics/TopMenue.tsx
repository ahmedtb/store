import React from 'react'
import { routes, api } from './urls'
import { Navbar, Nav, NavDropdown, Container, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import { refreshUser } from '../redux/stateActions';
import { connect } from "react-redux"
import NotificationsBell from './NotificationsBell';
import apiCallHandler from './apiCallHandler';
import { userType } from './types';


function TopMenue(props) {



    async function logout() {
        apiCallHandler(
            api.logout,
            (data) => props.refreshUser(null),
            'TopMenue logout',
            false
        )
    }

    return (
        <Navbar bg="green" expand="lg" className='py-0 px-0'>
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="row align-items-center" id="basic-navbar-nav">

                    {
                        !props.admin ? null : <Col xs={2} className='d-flex align-items-center m-0'>
                            <h5 className='fw-bold text-white'>
                                Medicate Int
                            </h5>
                        </Col>
                    }
                    <div className="col d-flex justify-content-between align-items-center">

                        <div className='me-auto'>
                            <Nav className='fw-bold text-white align-items-center'>

                                <NotificationsBell />
                                {
                                    props.admin ? (
                                        <NavDropdown title={props.admin.name}>
                                            <NavDropdown.Item onClick={logout} >{localization.logout}</NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <LinkContainer to={routes.loginPage()}>
                                            <Nav.Link >{localization.login}</Nav.Link>
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


const mapStateToProps = state => {
    return {
        admin: state.state.admin,
        allowedRoutes: state.state.allowedRoutes,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user : userType) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)