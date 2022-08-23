import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, } from 'react-router-dom'
import TopMenue from './basics/components/TopMenue'
import { Provider } from 'react-redux';
import store from './redux/store';
import AllowedRoutes from './basics/components/AllowedRoutes'
import SideMenue from './basics/components/SideMenue';
import { Container, Col, Row } from 'react-bootstrap';
import Footer from '../components/Footer'
import localization from '../components/localization';
import ErrorBoundary from './basics/components/ErrorBoundry';
import { api } from './basics/utility/urls';
import apiCallHandler from './basics/utility/apiCallHandler';

function App() {

    window.localization = localization
    React.useEffect(() => {
        apiCallHandler(
            api.currentLanguage,
            (locale) => {
                localization.setLanguage(locale)
                setupdateState(locale)
            },
            'localization current language',
            false
        )
    }, [])

    const [updateState, setupdateState] = React.useState()


    if (!updateState)
        return null

    return (
        <ErrorBoundary>
            <Provider store={store}>

                <BrowserRouter>
                    <Container fluid>
                        <Row>
                            <TopMenue />
                        </Row>
                        <Row>
                            <SideMenue />

                            <Col xs={10} className='p-0 mx-auto'>
                                <AllowedRoutes />
                            </Col>
                        </Row>
                        <Footer />
                    </Container>

                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    )

}

if (document.getElementById('store'))
    ReactDOM.render(<App />, document.getElementById('store'))