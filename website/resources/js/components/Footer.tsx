import React from 'react'

export default function Footer(props) {

    return <div className='row p-2 bg-dark text-white' >


        <div className="row mt-3">



            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                <h5 className="fw-bold mb-4 text-right">
                    {localization.contactUs}
                </h5>
                <p><i className="bi bi-home"></i> {localization.medicateAddress} </p>
                <p>
                    <i className="bi bi-envelope"></i>
                    Email: info@medicate.com
                </p>
                <p><i className="bi bi-phone"></i>whatsapp: +218910007283 </p>
                <p><i className="bi bi-print"></i>Phone: 0900155555 </p>
            </div>


            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                <h6 className="fw-bold mb-4">
                    <a className="navbar-brand" href="#"><img width="100%" src='/images/logomedicate.png' /></a>
                </h6>
                <p>
                    {localization.footerMessage}
                </p>
                <div className='d-flex justify-content-around'>
                    <div>
                        {localization.language}
                    </div>
                    {
                        localization.getAvailableLanguages().map((locale, index) => {
                            if (localization.getLanguage() === locale)
                                return <div key={index} >{locale}</div>
                            else
                                return <a key={index} href={`/language/${locale}`} >{locale}</a>

                        })
                    }
                </div>
            </div>

        </div>

        <div className="text-center p-4 bg-dark">
            Copyright <a className="text-reset fw-bold">Medicate</a>. All Rights Reserved
        </div>
    </div>
}