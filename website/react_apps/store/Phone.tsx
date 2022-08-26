import React from 'react';

function Phone() {


    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col">
                    <div className="card">
                        <div className="card-header">Phones</div>

                        <div className="card-body">
                            <div className='d-flex flex-wrap'>

                                <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 5} height={1200 / 5} />
                                <div>
                                    <div>name</div>
                                    <div>price</div>
                                    <div>description</div>

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

export default Phone;
