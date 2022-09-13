import React from 'react'
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai"

export default function Footer(props) {

    return <div className='' >
        <div className='d-flex justify-content-around bg-danger text-white'>
            <div>
                <div className='fw-bold'>Know more</div>
                <div>about us</div>
                <div>join us</div>
            </div>

            <div>
                <div className='fw-bold'>shop with us</div>
                <div>your account</div>
                <div>your addresses</div>
                <div>your bourchges</div>

            </div>

            <div>
                <div className='fw-bold'>delivary prices</div>

            </div>

            <div>
                <div className='fw-bold'>contact info</div>
                <div>tripoli - libya</div>
                <div>0913212131</div>
                <div>email@email.com</div>
            </div>
        </div>

        <div className="col-3 mx-auto d-flex justify-content-around bg-white my-2 p-3">

            <a href='https://www.facebook.com/' target={'_blank'} className=''>
                <AiFillFacebook size={50} color='red' />
            </a>
            <a className="text-danger" href='https://www.youtube.com' target={'_blank'}>
                <AiFillYoutube size={50} color='red' />
            </a>
        </div>

        <div className="text-center p-4 bg-dark text-white">
            Copyright <a className="text-reset fw-bold">{process.env.MIX_APP_NAME}</a>. All Rights Reserved
        </div>
    </div>
}