import React from 'react'
import { api, routes } from '../functions/urls'
import Paginator from '../../components/Paginator';
import SlidesTable from './components/SlidesTable';
import { TextFilter, getPaginationParams } from '../../components/Filters';
import AllowedLink from '../components/AllowedLink';
import { Card, Col, Row } from 'react-bootstrap';
import apiCallHandler from '../functions/apiCallHandler';

export default function SlidesIndex() {


    const [slidesPagination, setslidesPagination] = React.useState<pagination<slides>>()
    const [update, setupdate] = React.useState<number>()


    function fetch(params: object) {
        return api.slidesIndex({ ...getPaginationParams(slidesPagination), ...params, with: 'category' });
    }

    const deleteFun = (id: number) => {
        if (confirm('هل تريد فعلا حدف الاعلان')) {
            apiCallHandler(
                () => api.slideDelete(id),
                (data) => { alert(data); setupdate(Math.random()) },
                'delete slide',
                true
            )
        }
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
            <SlidesTable slides={slidesPagination?.data} addColumns={[
                {
                    title: 'إجراءات',
                    content: (slide: slide, index) => <button className='btn btn-danger' onClick={() => deleteFun(slide.id)}>حدف</button>
                }
            ]} />
        </div >
        <Paginator update={update} log={'slides index'} apiCall={fetch} useState={[slidesPagination, setslidesPagination]} />
    </div>

}

