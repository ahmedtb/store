import React from 'react';
import AllowedLink from './components/AllowedLink';
import { routes, api } from './functions/urls';
import { getPaginationParams } from '../components/Filters';
import Paginator from '../components/Paginator';
import Slider from "react-slick";
import apiCallHandler from '../functions/apiCallHandler';

class SimpleSlider extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 1500
        };
        return (
            <div>
                <h2> Single Item</h2>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}

export default function Home() {
    const [productsPagination, setproductsPagination] = React.useState<pagination<products>>()


    function fetch(params) {
        return api.productsIndex({ ...getPaginationParams(productsPagination), ...params, with: 'category' });
    }

    const [products, setproducts] = React.useState<products>()

    function fetchRandomProducts(count: number) {
        apiCallHandler(
            () => api.productsIndex({ inRandomOrder: true, page_size: count }),
            (data) => { setproducts(data.data) },
            'fetchRandomProducts',
            true
        )
    }

    React.useEffect(() => {
        fetchRandomProducts(20)
    }, [])

    return (
        <div className="container bg-white p-3">


            <div className="">
                <div className='border p-2 m-2 rounded shadow'>
                    <Slider {...{
                        dots: true,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        autoplay: true,
                        autoplaySpeed: 1500
                    }}>
                        {
                            products?.map((product, index) => {
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
                    </Slider>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <img src='https://cdn-icons-png.flaticon.com/512/882/882747.png' className='w-100' />
                    </div>
                    <div className='col-3'>
                        <img src='https://i.pinimg.com/originals/7b/a2/7b/7ba27b85ee51849568dd6076d0e44b15.png' className='w-100' />
                    </div>
                    <div className='col-3'>
                        <img src='https://cdn-icons-png.flaticon.com/512/882/882738.png' className='w-100' />
                    </div>
                    <div className='col-3'>
                        <img src='https://icons-for-free.com/iconfiles/png/512/company+mi+mobile+xiaomi+icon-1320168262452948540.png' className='w-100' />
                    </div>
                    <div className='col-3'>
                        <img src='https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/lg-512.png' className='w-100' />
                    </div>
                </div>
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

            </div>
            <Paginator log={'Home'} apiCall={fetch} useState={[productsPagination, setproductsPagination]} />
        </div>
    );
}

