import React from 'react'
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai"

export default function Footer(props) {

    return <div className='fs-5' >
        <div className='d-flex justify-content-around bg-danger text-white'>
            <div>
                <div className='fw-bold'>إعرف المزيد</div>
                <div>حولنا</div>
                <div>إنضم إلينا</div>
                <div>أسعار التوصيل</div>
            </div>


            <div>
                <div className='fw-bold'>إتصل بينا</div>
                <div>طرابلس - ليبيا</div>
                <div>0913212131</div>
                <div>email@email.com</div>
                <a href='https://www.facebook.com/' target={'_blank'} className=''>
                    <AiFillFacebook size={50}  />
                </a>
                <a className="text-danger" href='https://www.youtube.com' target={'_blank'}>
                    <AiFillYoutube size={50} color='blue' />
                </a>
            </div>

        </div>

        <div className="text-center p-4 bg-dark text-white">
            Copyright <a className="text-reset fw-bold">{process.env.MIX_APP_NAME}</a>. All Rights Reserved
        </div>
    </div>
}