import React from 'react';
import ReactDOM from 'react-dom';

function Phone() {
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
                            <img src='https://www.apple.com/newsroom/images/product/iphone/standard/iphonex_front_back_glass_big.jpg.large.jpg' width={816 / 5} height={1200 / 5} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Phone;
