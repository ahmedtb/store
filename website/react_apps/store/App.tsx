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
                    <TopMenue2 />
                    <div className='min-vh-100 d-flex flex-column justify-content-between' style={{ background: 'linear-gradient(-134deg, #FFA62E 0%, #FB962E 20%, #F8852E 40%, #F3742D 60%, #EF612D 80%, #EA4D2C 100%)' }}>
                        <div className='p-0 mx-5'>

                            <AllowedRoutes />

                        </div>
                    </div>
                    <Footer />

                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    )

}

if (document.getElementById('store'))
    ReactDOM.render(<App />, document.getElementById('store'))