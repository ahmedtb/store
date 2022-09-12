import React from 'react'
import { routes, api } from '../functions/urls'
import { Navbar, Nav, NavDropdown, Container, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { refreshUser, refreshCart } from '../redux/stateActions';
import { connect } from "react-redux"
import NotificationsBell from '../notification/NotificationsBell';
import apiCallHandler from '../functions/apiCallHandler';
import { Dispatch } from 'redux';
import CartBell from './CartBell';
import { Link } from 'react-router-dom'

function TopMenue(props: { refreshUser: typeof refreshUser, user: user, refreshCart: typeof refreshCart }) {
    const [q, setq] = React.useState<string>()



    async function logout() {
        apiCallHandler(
            api.logout,
            (data) => { props.refreshUser(null); props.refreshCart(null) },
            'TopMenue logout',
            true
        )
    }

    return (
        <Navbar bg="primary" variant='light' expand="lg" className='py-0 px-0'>
            <Container fluid>
                <LinkContainer to={routes.home()}>
                    <Navbar.Brand className='d-flex align-items-center'>
                        <img src='https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200712/117609654-phone-shop-logo-design-template-gadget-shop-logo-design.jpg' width={75} height={75} />
                        <div className='fs-2 ms-3 text-white'>
                            Phone Store
                        </div>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="" id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center text-white"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <div className="d-flex me-2">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={e => setq(e.target.value)}
                            />
                            <Link className="btn btn-outline-light" to={routes.productsFiltering() + '?q=' + q} >Search</Link>
                        </div>
                        <CartBell />
                        <NotificationsBell />
                        {
                            props.user ? (
                                <NavDropdown title={props.user.name}>
                                    <LinkContainer to={routes.myOrders()}>
                                        <NavDropdown.Item  >{window.localization.orders}</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logout} >{window.localization.logout}</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <div className='d-flex'>
                                    <LinkContainer to={routes.loginPage()} className='text-white'>
                                        <Nav.Link >{window.localization.login}</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to={routes.signUp()} className='text-white'>
                                        <Nav.Link >{window.localization.signUp}</Nav.Link>
                                    </LinkContainer>
                                </div>
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
        refreshCart: (cart: cart) => dispatch(refreshCart(cart)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)