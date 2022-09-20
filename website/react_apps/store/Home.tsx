import React from 'react';
import AllowedLink from './components/AllowedLink';
import { routes, api } from './functions/urls';
import { getPaginationParams } from '../components/Filters';
import Slider from "react-slick";
import apiCallHandler from '../functions/apiCallHandler';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsFiltering from './ProductsFiltering';
import useWindowDimensions from '../functions/useWindowDimensions';

export default function Home() {
    const [productsPagination, setproductsPagination] = React.useState<pagination<products>>()
    const { height, width } = useWindowDimensions();


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

    const [slides, setslides] = React.useState<slides>()

    function fetchSlides() {
        apiCallHandler(
            () => api.slides(),
            (data) => { setslides(data) },
            'fetchSlides',
            true
        )
    }

    React.useEffect(() => {
        fetchRandomProducts(20)
        fetchSlides()
    }, [])

    return (
        <div className="bg-white">

            {slides?.length ?

                <div className='mx-auto'>
                    <Slider {...{
                        infinite: true,
                        speed: 3000,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        arrows: false,
                    }}>

                        {
                            slides?.map((slide, index) => <AllowedLink key={index} to={slide.to} className=''>
                                <img src={slide.image} className='w-100 mx-auto' />
                            </AllowedLink>)
                        }


                    </Slider>
                </div>
                : null}
            <div className="">
                {
                    width < 1300 ? null :
                        <div className='col-8 mx-auto border p-2 m-3 rounded shadow'>
                            <Slider {...{
                                // dots: true,
                                infinite: true,
                                speed: 3000,
                                slidesToShow: 4,
                                slidesToScroll: 2,
                                autoplay: true,
                                autoplaySpeed: 3000,
                                arrows: false,

                            }}>
                                {
                                    products?.map((product, index) => {
                                        return <AllowedLink key={index} to={routes.productShow(product.id)} className='d-flex text-dark text-decoration-none'>
                                            <img src={api.productImage(product.id)} width={100} className='m-2' />
                                            <div>
                                                <div>{product.name}</div>
                                                <div>{product.category?.name}</div>
                                                <div>{product.price}</div>
                                                {/* <div>{product.description}</div> */}
                                            </div>
                                        </AllowedLink>
                                    })
                                }
                            </Slider>
                        </div>
                }


                <div className='border p-2 m-2 rounded shadow'>

                    <div className='fw-bold'>البحث خلال المنتجات</div>
                    <ProductsFiltering />
                </div>

            </div>
        </div >
    );
}

