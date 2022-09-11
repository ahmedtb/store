import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, } from 'react-router-dom'
import TopMenue2 from './components/TopMenue2'
import { Provider } from 'react-redux';
import store from './redux/store';
import AllowedRoutes from './components/AllowedRoutes'
import SideMenue from './components/SideMenue';
import { Container, Col, Row } from 'react-bootstrap';
import Footer from '../components/Footer'
import localization from '../functions/localization';
import ErrorBoundary from './components/ErrorBoundry';
import { api } from './functions/urls';
import apiCallHandler from './functions/apiCallHandler';

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
                    <Container fluid className='min-vh-100 d-flex flex-column justify-content-between'>
                        <div>

                            <Row>
                                <TopMenue2 />
                            </Row>
                            <Row>
                                {/* <Col xs={10} className='p-0 mx-auto'> */}
                                <AllowedRoutes />
                                {/* </Col> */}
                            </Row>
                        </div>
                        <Footer />
                    </Container>

                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    )

}

if (document.getElementById('store'))
    ReactDOM.render(<App />, document.getElementById('store'))