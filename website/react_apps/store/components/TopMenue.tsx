import React from 'react'
import { routes, api } from '../functions/urls'
import { Navbar, Nav, NavDropdown, Container, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { refreshUser } from '../redux/stateActions';
import { connect } from "react-redux"
import NotificationsBell from './NotificationsBell';
import apiCallHandler from '../functions/apiCallHandler';
import { Dispatch } from 'redux';
import CartBell from './CartBell';

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
        <Navbar bg="light" expand="md" className='py-0 px-0'>
            <Container>
                <Navbar.Brand className='d-flex align-items-center'>
                    <img src='https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200712/117609654-phone-shop-logo-design-template-gadget-shop-logo-design.jpg' width={'10%'} />
                    <div className='fs-2 ms-3'>
                        Phone Store
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="" id="basic-navbar-nav">




                    <Nav className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Form className="col d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <CartBell />
                        {/* <NotificationsBell /> */}
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

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


const mapStateToProps = (state: { state: storeState }) => {
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