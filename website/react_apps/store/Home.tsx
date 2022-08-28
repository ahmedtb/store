import React from 'react';
import AllowedLink from './components/AllowedLink';
import { routes, api } from './functions/urls';
import { getPaginationParams } from '../components/Filters';
import Paginator from '../components/Paginator';

export default function Home() {
    const [productsPagination, setproductsPagination] = React.useState<pagination<products>>()


    function fetch(params) {
        return api.productsIndex({ ...getPaginationParams(productsPagination), ...params, with: 'category' });
    }

    return (
        <div className="container">

            <div className="card">
                <div className="card-header">Phones</div>

                <div className="card-body d-flex flex-wrap">

                    {
                        productsPagination?.data?.map((product, index) => {
                            return <AllowedLink key={index} to={routes.productShow(product.id)} className='d-flex text-dark text-decoration-none'>
                                <img src={api.productImage(product.id)} width={816 / 10} height={1200 / 10} />
                                <div>
                                    <div>{product.name}</div>
                                    <div>{product.category?.name}</div>
                                    <div>{product.price}</div>
                                    <div>{product.description}</div>
                                </div>
                            </AllowedLink>
                        })
                    }

                </div>
                <Paginator log={'Home'} apiCall={fetch} useState={[productsPagination, setproductsPagination]} />
            </div>
        </div>
    );
}

