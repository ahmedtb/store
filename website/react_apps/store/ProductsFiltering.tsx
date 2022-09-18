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
    let [update, setupdate] = React.useState<number>();

    const [productsPagination, setproductsPagination] = React.useState<pagination<products>>()


    function fetch(params) {
        return api.productsIndex({ ...getPaginationParams(productsPagination), q: q, category_id: category_id, ...params, page_size: 9, with: 'category' });
    }

    React.useEffect(() => {
        console.log('q', q)
        setcategory_id(
            searchParams.get("category_id")
        )
        setQuery(
            searchParams.get("q")
        )
        setupdate(Math.random())
    }, [searchParams])

    const [categories, setcategories] = React.useState<categories>()

    React.useEffect(() => {
        apiCallHandler(
            api.categories,
            (data) => { setcategories(data) },
            'ProductsFiltering categories',
            true
        )
    }, [])

    return <div className='bg-white p-2'>
        <div className='row'>
            <div className='col-lg-3'>
                <TextFilter
                    property={'q'}
                    label={'الاسم'}
                    apiCall={fetch}
                    useState={[productsPagination, setproductsPagination]}
                    initValue={q}
                />
                <TextFilter
                    property={'priceFrom'}
                    label={'السعر من'}
                    apiCall={fetch}
                    useState={[productsPagination, setproductsPagination]}
                />
                <TextFilter
                    property={'priceTo'}
                    label={'السعر الى'}
                    apiCall={fetch}
                    useState={[productsPagination, setproductsPagination]}
                />
                <SelectFilter
                    options={categories}
                    apiCall={fetch}
                    property={'category_id'}
                    label={'التصنيف'}
                    valueKeyWord='id'
                    nameKeyWord='name'
                    useState={[productsPagination, setproductsPagination]}
                    defaultValue={category_id}
                />

            </div>
            <div className='col-lg-9 row justify-content-center'>
                {
                    productsPagination?.data?.map((product, index) => {
                        return <AllowedLink key={index} to={routes.productShow(product.id)} className='col-md-3 d-flex text-dark text-decoration-none border rounded p-1 m-1'>
                            <img src={api.productImage(product.id)} width={100} />
                            <div>
                                <div>{product.name}</div>
                                <div>{product.category?.name}</div>
                                <div>{product.price}</div>
                                {/* <div>{product.description}</div> */}
                            </div>
                        </AllowedLink>
                    })
                }
                <Paginator update={update} log={'Home'} apiCall={fetch} useState={[productsPagination, setproductsPagination]} />
            </div>

        </div>

    </div>
}