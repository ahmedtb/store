import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className="container">
            <div className='d-flex justify-content-between m-2'>
                <h3>Phone Store</h3>
                <div>
                    <div>log in</div>
                    <div>sign up</div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col">
                    <div className="card">
                        <div className="card-header">Phones</div>

                        <div className="card-body d-flex flex-wrap">
                            <a className='m-5 d-flex '>
                                <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 10} height={1200 / 10} />
                                <div>
                                    <div>IPhone X</div>
                                    <div>1000 dinar</div>
                                    <div>IPhone X descriptions and specs</div>
                                </div>
                            </a>
                            <a className='m-5 d-flex '>
                                <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 10} height={1200 / 10} />
                                <div>

                                    <div>IPhone 7</div>
                                    <div>750 dinar</div>
                                    <div>IPhone 7 descriptions and specs</div>
                                </div>

                            </a>
                            <a className='m-5 d-flex '>
                                <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 10} height={1200 / 10} />
                                <div>

                                    <div>IPhone 10</div>
                                    <div>900 dinar</div>
                                    <div>IPhone 10 descriptions and specs</div>
                                </div>

                            </a>
                            <a className='m-5 d-flex '>
                                <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 10} height={1200 / 10} />
                                <div>

                                    <div>IPhone 10</div>
                                    <div>900 dinar</div>
                                    <div>IPhone 10 descriptions and specs</div>
                                </div>

                            </a>
                            <a className='m-5 d-flex '>
                                <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 10} height={1200 / 10} />
                                <div>

                                    <div>IPhone 10</div>
                                    <div>900 dinar</div>
                                    <div>IPhone 10 descriptions and specs</div>
                                </div>

                            </a>
                            <a className='m-5 d-flex '>
                                <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 10} height={1200 / 10} />
                                <div>

                                    <div>IPhone 10</div>
                                    <div>900 dinar</div>
                                    <div>IPhone 10 descriptions and specs</div>
                                </div>

                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
