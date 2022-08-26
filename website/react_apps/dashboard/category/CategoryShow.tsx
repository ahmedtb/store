import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditCategoryModal from './components/EditCategoryModal';

export default function CategoryShow(props) {

    const { id } = useParams();
    const [category, setcategory] = React.useState<category>(null)

    async function getCategoryInfo() {
        apiCallHandler(
            async () => await api.categoryShow(+id),
            setcategory,
            'CategoryShow getCategoryInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getCategoryInfo()
        }
    }, [id])


    const [redirect, setredirect] = React.useState(false)
    async function deleteCategory() {
        apiCallHandler(
            () => api.categoryDelete(category?.id),
            (data) => setredirect(true),
            'Category Show delete Category',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.categoriesIndex()} />;
    }

    return <div className='p-4'>

        <Row>


            <Col xs={9}>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.name}
                    </div>
                    <div>
                        {category?.name}
                    </div>
                </div>
                <div className='fs-4 d-flex'>
                    <div className='fw-bold me-1'>
                        {window.localization.parent}
                    </div>
                    <div>
                        {category?.parent?.name}
                    </div>
                </div>
                <div>
                    <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                        <div>
                            {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.category)}
                        </div>
                        <div className='d-flex justify-content-around my-2'>
                            <button className="btn btn-secondary" onClick={deleteCategory} data-dismiss="modal">{window.localization.yes}</button>
                            <button className='btn btn-success' data-dismiss="modal">{window.localization.no}</button>
                        </div>

                    </CustomModal>
                    <EditCategoryModal category={category} change={getCategoryInfo} />
                </div>
            </Col>
        </Row>


    </div>
}