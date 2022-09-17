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
        <div className="container">

            <div className="row justify-content-center">
                <div className="col">
                    <div className="card">
                        <div className="card-header">Phones</div>

                        <div className="card-body">
                            <div className='d-flex flex-wrap'>

                                <img src={api.productImage(+id)} width={816 / 5} height={1200 / 5} />
                                <div>
                                    <div>{product?.name}</div>
                                    <div>category <AllowedLink to={routes.productsFiltering() + '?category_id=' + product?.category_id}>{product?.category?.name}</AllowedLink></div>
                            
                                    <div>{product?.price}</div>
                                    <div>{product?.description}</div>

                                </div>

                            </div>

                            <VarInput className='form-control m-2' variable={quantity} setvariable={setquantity} />
                            <LoginPageModal label='add to the cart'>
                                <button onClick={addToCart} className='btn btn-success'>add to the cart</button>
                            </LoginPageModal>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductShow;
