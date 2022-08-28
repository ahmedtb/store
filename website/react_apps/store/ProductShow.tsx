import React from 'react';
import { api } from './functions/urls';
import { useParams } from 'react-router'
import apiCallHandler from './functions/apiCallHandler';

function ProductShow() {
    const { id } = useParams();
    const [product, setproduct] = React.useState<product>(null)

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
                                    <div>{product?.category?.name}</div>
                                    <div>{product?.price}</div>
                                    <div>{product?.description}</div>

                                </div>

                            </div>
                            <button onClick={null} className='btn btn-success'>add to the cart</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductShow;
