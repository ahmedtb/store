import React from 'react';
import { api, routes } from './functions/urls';
import { useParams } from 'react-router'
import apiCallHandler from './functions/apiCallHandler';
import VarInput from '../components/VarInput';
import { updateCart } from './redux/stateFunctions';
import LoginPageModal from './user/LoginPageModal';
import AllowedLink from './components/AllowedLink';

function ProductShow() {
    const { id } = useParams();
    const [product, setproduct] = React.useState<product>(null)
    const [quantity, setquantity] = React.useState<number>(1)

    function getProduct() {
        apiCallHandler(
            () => api.productShow(+id),
            (data) => { setproduct(data); },
            'ProductShow getProduct',
            true
        )
    }

    React.useEffect(() => {
        getProduct()
    }, [])

    const addToCart = () => {
        apiCallHandler(
            () => api.addToCart(+id, quantity),
            (data) => { alert(data); updateCart() },
            'ProductShow addToCart',
            true
        )
    }

    return (
        <div className="bg-white p-5">

            <div className='d-flex align-items-start'>

                <img src={api.productImage(+id)} width={100} className='m-2' />
                <div className='p-2'>
                    <div className='fs-3 fw-bold'>{product?.name}</div>
                    <div>التصنيف <AllowedLink to={routes.productsFiltering() + '?category_id=' + product?.category_id}>{product?.category?.name}</AllowedLink></div>

                    <div>السعر {product?.price}</div>
                    <div>{product?.description}</div>

                    <div className='d-flex mt-3'>
                        <VarInput className='form-control w-50 m-1' variable={quantity} setvariable={setquantity} />
                        <LoginPageModal label='أضف الى السلة'>
                            <button onClick={addToCart} className='btn btn-success mx-2 d-block'>أضف الى السلة</button>
                        </LoginPageModal>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default ProductShow;
