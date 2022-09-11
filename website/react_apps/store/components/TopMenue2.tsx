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

function TopMenue2(props: { refreshUser: typeof refreshUser, user: user, refreshCart: typeof refreshCart }) {
    const [q, setq] = React.useState<string>()



    async function logout() {
        apiCallHandler(
            api.logout,
            (data) => { props.refreshUser(null); props.refreshCart(null) },
            'TopMenue2 logout',
            true
        )
    }
    const [categories, setcategories] = React.useState<categories>()

    React.useEffect(() => {
        apiCallHandler(
            api.categories,
            (data) => { setcategories(data) },
            'TopMenue2 categories',
            true
        )
    }, [])

    return (
        <div>

            <div className='d-flex p-1 bg-primary align-items-center'>
                <LinkContainer to={routes.home()}>
                    <div className='d-flex'>

                        <img src='https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200712/117609654-phone-shop-logo-design-template-gadget-shop-logo-design.jpg' width={75} height={75} />
                        <div className='fs-2 ms-3 text-white'>
                            Phone Store
                        </div>
                    </div>
                </LinkContainer>

                <div className="d-flex mx-2">
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
                            <Link to={routes.myOrders()}>
                                <NavDropdown.Item  >{window.localization.orders}</NavDropdown.Item>
                            </Link>

                            <NavDropdown.Item onClick={logout} >{window.localization.logout}</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <div className='d-flex'>
                            <Link to={routes.loginPage()} className='text-white mx-1'>
                                <div >{window.localization.login}</div>
                            </Link>
                            <Link to={routes.signUp()} className='text-white mx-1'>
                                <div >{window.localization.signUp}</div>
                            </Link>
                        </div>
                    )
                }



            </div>
            <div className='d-flex flex-wrap bg-dark'>
                {
                    categories?.map((category, index) => <Link to={routes.productsFiltering()+'?category_id='+category.id} key={index} className='mx-2 text-decoration-none text-white'>
                        {category.name}
                    </Link>)
                }
            </div>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue2)