import React from 'react'
import { useSearchParams } from 'react-router-dom'
import AllowedLink from './components/AllowedLink';
import { routes, api } from './functions/urls';
import { getPaginationParams, SelectFilter, TextFilter } from '../components/Filters';
import Paginator from '../components/Paginator';
import VarInput from '../components/VarInput';
import apiCallHandler from './functions/apiCallHandler';

export default function ProductsFiltering(props) {
    let [searchParams, setSearchParams] = useSearchParams();
    let [q, setQuery] = React.useState(
        searchParams.get("q")
    );
    let [category_id, setcategory_id] = React.useState(
        searchParams.get("category_id")
    );

    const [productsPagination, setproductsPagination] = React.useState<pagination<products>>()


    function fetch(params) {
        return api.productsIndex({ q: q, category_id: category_id, ...getPaginationParams(productsPagination), ...params, with: 'category' });
    }

    React.useEffect(() => {
        console.log('q', q)
    }, [q])

    const [categories, setcategories] = React.useState<categories>()

    React.useEffect(() => {
        apiCallHandler(
            api.categories,
            (data) => { setcategories(data) },
            'TopMenue2 categories',
            true
        )
    }, [])

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
            <SelectFilter
                options={categories}
                apiCall={fetch}
                property={'category_id'}
                label={'category'}
                valueKeyWord='id'
                nameKeyWord='name'
                useState={[productsPagination, setproductsPagination]}
                defaultValue={category_id}
            />

        </div>

    </div>
}