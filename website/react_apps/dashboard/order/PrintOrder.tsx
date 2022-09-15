import React from 'react'
import { useParams } from 'react-router'
import ReactToPrint from "react-to-print";
import { api, routes } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';
import AllowedLink from '../components/AllowedLink';
import { Table } from 'react-bootstrap';

export default function PrintOrder(props) {
    const componentRef = React.useRef();
    return (
        <div>
            <OrderPaper ref={componentRef} />
            <ReactToPrint
                trigger={() => <button className='btn btn-primary'>إطبع</button>}
                content={() => componentRef.current}
            />
        </div>
    );
};


const OrderPaper = React.forwardRef<HTMLDivElement>((props, ref) => {

    const { id } = useParams()
    const [order, setorder] = React.useState<order>(null)

    async function getOrderInfo() {
        apiCallHandler(
            () => api.orderShow(+id),
            setorder,
            'OrderPaper getOrderInfo',
            true
        )
    }



    React.useEffect(() => {
        if (id) {
            getOrderInfo()
        }
    }, [id])


    return (
        <div className='pb-6 bg-white' ref={ref}>


            <Table striped bordered hover responsive>

                <tbody>

                    <tr>
                        <td>order id</td>
                        <td>{order?.id}</td>
                    </tr>
                    <tr>
                        <td>GPS</td>
                        <td>lat: {order?.GPS.lat}, long: {order?.GPS.long} </td>
                    </tr>

                </tbody>
            </Table>
            <Table striped bordered hover responsive>

                <tbody>

                    <tr>
                        <td>phone</td>
                        <td>{order?.user.phone} </td>
                    </tr>

                    <tr>
                        <td>created at</td>
                        <td>{order?.created_at} </td>
                    </tr>

                </tbody>
            </Table>

            <div>

                <div className=''>{window.localization.user} <AllowedLink to={routes.orderShow(order?.user_id)}>{order?.user?.name}</AllowedLink></div>
                <div>order items</div>
                <div className='' style={{ height: '100px' }}>
                    {
                        order?.order_items?.map((item, index) => {

                            return <div key={index} className='d-flex h-50 d-inline-block'>
                                <img src={api.productImage(item.product_id)} />
                                <div >
                                    <div>product name: <AllowedLink to={routes.productShow(item.product_id)}>{item.product?.name}</AllowedLink></div>
                                    <div>quantity: {item.quantity}</div>
                                    <div>value: {item.value}</div>
                                </div>

                            </div>
                        })
                    }
                </div>

            </div>

            <div>location of customer</div>
            {
                order?.GPS ?
                    <iframe src={"https://maps.google.com/maps?q=" + order?.GPS?.lat + ",%20" + order?.GPS?.long + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}></iframe>
                    : null
            }
            <div>
                {'lat: ' + order?.GPS?.lat + " long: " + order?.GPS?.long}
            </div>


        </div >

    )
})
