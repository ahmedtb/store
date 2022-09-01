import React from 'react'
import { useSearchParams } from 'react-router-dom'
import AllowedLink from './components/AllowedLink';
import { routes, api } from './functions/urls';
import { getPaginationParams, TextFilter } from '../components/Filters';
import Paginator from '../components/Paginator';
import VarInput from '../components/VarInput';

export default function ProductsFiltering(props) {
    let [searchParams, setSearchParams] = useSearchParams();
    let [q, setQuery] = React.useState(
        searchParams.get("q")
    );

    const [productsPagination, setproductsPagination] = React.useState<pagination<products>>()


    function fetch(params) {
        return api.productsIndex({ q: q, ...getPaginationParams(productsPagination), ...params, with: 'category' });
    }

    React.useEffect(() => {
        console.log('q', q)
    }, [q])

    return <div className='row bg-white'>

        <div className='col-9'>
            {
                productsPagination?.data?.map((product, index) => {
                    return <AllowedLink key={index} to={routes.productShow(product.id)} className='d-flex text-dark text-decoration-none'>
                        <img src={api.productImage(1)} width={816 / 10} height={1200 / 10} />
                        <div>
                            <div>{product.name}</div>
                            <div>{product.category?.name}</div>
                            <div>{product.price}</div>
                            <div>{product.description}</div>
                        </div>
                    </AllowedLink>
                })
            }
            <Paginator log={'Home'} apiCall={fetch} useState={[productsPagination, setproductsPagination]} />
        </div>
        <div className='col-3'>
            <TextFilter
                property={'q'}
                label={'name'}
                apiCall={fetch}
                useState={[productsPagination, setproductsPagination]}
                initValue={q}
            />
            <TextFilter
                property={'priceFrom'}
                label={'priceFrom'}
                apiCall={fetch}
                useState={[productsPagination, setproductsPagination]}
            />
            <TextFilter
                property={'priceTo'}
                label={'priceTo'}
                apiCall={fetch}
                useState={[productsPagination, setproductsPagination]}
            />

        </div>

    </div>
}