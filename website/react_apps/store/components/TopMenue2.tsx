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
import useWindowDimensions from '../../functions/useWindowDimensions';
import { BsList } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import DeliverToIcon from './DeliverToIcon';
import AllowedLink from './AllowedLink';

function TopMenue2(props: { refreshUser: typeof refreshUser, user: user, refreshCart: typeof refreshCart }) {
    const [q, setq] = React.useState<string>()
    const { height, width } = useWindowDimensions();
    const [toggle, settoggle] = React.useState<boolean>(false)


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
            'ProductsFiltering categories',
            true
        )
    }, [])



    if (width <= 1000)
        return (
            <div>

                <div className='p-1 bg-dark align-items-center'>

                    <div className='d-flex justify-content-between align-items-center'>
                        <LinkContainer to={routes.home()}>
                            <div className='fs-2 ms-3 text-white'>
                                متجر هواتف
                            </div>
                        </LinkContainer>
                        <div className='d-flex align-items-center'>
                            <div className='mx-2 text-white'>
                                <DeliverToIcon />
                            </div>
                            <CartBell />
                            <NotificationsBell />
                            {
                                props.user ? (
                                    <NavDropdown title={props.user.name} className='text-white'>
                                        <LinkContainer to={routes.myOrders()}>
                                            <NavDropdown.Item>{window.localization.orders}</NavDropdown.Item>
                                        </LinkContainer>

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

                    </div>

                    <div className="d-flex m-1">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={e => setq(e.target.value)}
                        />
                        <Link className="btn btn-outline-light" to={routes.productsFiltering() + '?q=' + q} >Search</Link>
                    </div>




                </div>
                <div className='d-flex flex-wrap bg-secondary'>
                </div>
                <div className='d-flex flex-wrap bg-secondary py-1'>
                    {
                        categories?.map((category, index) => <AllowedLink to={routes.productsFiltering() + '?category_id=' + category.id} key={index} className='mx-2 text-decoration-none text-white'>
                            {category.name}
                        </AllowedLink>)
                    }
                </div>

            </div>

        )

    return (
        <div>

            <div className='d-flex p-1 bg-dark align-items-center'>
                <LinkContainer to={routes.home()}>
                    <div className='fs-2 ms-3 text-white'>
                        متجر هواتف
                    </div>
                </LinkContainer>

                <div className='mx-2 text-white'>
                    <DeliverToIcon />
                </div>
                <div className="d-flex mx-2 flex-grow-1">
                    <input
                        type="text"
                        className="p-1 flex-grow-1"
                        aria-label="Search"
                        onChange={e => setq(e.target.value)}
                    />
                    <Link className="bg-warning px-2" to={routes.productsFiltering() + '?q=' + q} >
                        <AiOutlineSearch className='my-auto d-block' size={25} color={'black'} />
                    </Link>
                </div>

                {
                    props.user ? (
                        <NavDropdown title={props.user.name} className='text-white mx-2' >
                            <NavDropdown.Item onClick={logout} >{window.localization.logout}</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <div className='d-flex'>
                            <AllowedLink to={routes.loginPage()} className='text-white mx-2'>
                                <div >{window.localization.login}</div>
                            </AllowedLink>
                            <AllowedLink to={routes.signUp()} className='text-white mx-2'>
                                <div >{window.localization.signUp}</div>
                            </AllowedLink>
                        </div>
                    )
                }
                <AllowedLink to={routes.myOrders()} className='text-white mx-2 fs-5'>
                    طلباتي
                </AllowedLink>
                <div className='mx-2'>

                    <CartBell />
                </div>
                <div className='mx-2'>
                    <NotificationsBell />

                </div>




            </div>
            <div className='d-flex flex-wrap bg-secondary py-1'>
                {
                    categories?.map((category, index) => <AllowedLink to={routes.productsFiltering() + '?category_id=' + category.id} key={index} className='mx-2 text-decoration-none text-white'>
                        {category.name}
                    </AllowedLink>)
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