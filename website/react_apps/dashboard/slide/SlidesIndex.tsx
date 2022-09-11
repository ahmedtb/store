import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import SlidesTable from './components/SlidesTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';

export default function SlidesIndex() {


    const [slidesPagination, setslidesPagination] = React.useState<pagination<slides>>()


    function fetch(params) {
        return api.slidesIndex({ ...getPaginationParams(slidesPagination), ...params, with: 'category' });
    }

    return <div className='p-3 bg-white'>
        <div className='d-flex justify-content-between'>
            <div className='fs-4'>
                {window.localization.slidesList}
            </div>
            <div>
                <AllowedLink to={routes.createSlide()}>{window.localization.createSlide}</AllowedLink>
            </div>
        </div>

        <div className='row align-items-center'>
            <Col>
                <TextFilter
                    apiCall={fetch} useState={[slidesPagination, setslidesPagination]}
                    property={'to'}
                    label={window.localization.to}
                />
            </Col>
            <Col>

            </Col>
        </div>

        <div>
            <SlidesTable slides={slidesPagination?.data} />
        </div >
        <Paginator log={'SlidesIndex'} apiCall={fetch} useState={[slidesPagination, setslidesPagination]} />
    </div>

}

