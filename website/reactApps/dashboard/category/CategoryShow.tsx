import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams, Navigate } from 'react-router-dom';
import { api, routes } from '../functions/urls'
import apiCallHandler from '../functions/apiCallHandler';
import CustomModal from '../../components/CustomModal';
import EditCategoryModal from './components/EditCategoryModal';

export default function CategoryShow(props) {

    const { id } = useParams();
    const [category, setcategory] = React.useState(null)

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
            async () => await api.categoryDelete(category?.id),
            (data) => setredirect(true),
            'Category Show delete Category',
            true
        )
    }
    if (redirect) {
        return <Navigate to={routes.categoriesIndex()} />;
    }

    return <div className='p-2'>

        <Card className='my-2'>

            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div>
                        منتج رقم {category?.id}
                    </div>

                    <div>
                        <CustomModal buttonClass="btn btn-info mx-2" label={window.localization.delete} >
                            <div>
                                {window.localization.formatString(window.localization.doYouWantToDelete, window.localization.category)}
                            </div>
                            <div className='d-flex justify-content-around my-2'>
                                <button className="btn btn-secondary" onClick={deleteCategory} data-dismiss="modal">{window.localization.yes}</button>
                                <button className='btn btn-success' data-dismiss="modal">لا</button>
                            </div>

                        </CustomModal>
                        <EditCategoryModal category={category} change={getCategoryInfo} />
                    </div>

                </div>

            </Card.Header>

            <Card.Body>

                <Row>

                    <Col xs={9}>
                        <div className='fs-4'>{window.localization.name} {category?.name}</div>
                        <div className='fs-4'>{window.localization.price} {category?.price}</div>
                        <div className='fs-4'>  {window.localization.category} {category?.category?.name}</div>
                        <div className='fs-4'>  {window.localization.description} {category?.description}</div>

                    </Col>
                </Row>
            </Card.Body>
        </Card>


    </div>
}