import React from 'react'
import { useParams } from 'react-router'
import ReactToPrint from "react-to-print";
import { api, routes } from '../functions/urls';
import apiCallHandler from '../functions/apiCallHandler';
import AllowedLink from '../components/AllowedLink';
import { Table } from 'react-bootstrap';
import moment from 'moment';
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
        <div className='p-3 bg-white' ref={ref}>

            <div className='d-flex justify-content-around'>

                <div className='fs-4 fw-bold'>
                    Phone Store
                </div>

                <Table bordered responsive>

                    <tbody>

                        <tr>
                            <td>order id</td>
                            <td>{order?.id}</td>
                        </tr>
                        <tr>
                            <td>customer</td>
                            <td><AllowedLink to={routes.userShow(order?.user_id)}>{order?.user.name}</AllowedLink></td>
                        </tr>
                        <tr>
                            <td>GPS</td>
                            <td>lat: {order?.GPS.lat}, long: {order?.GPS.long} </td>
                        </tr>

                        <tr>
                            <td>phone</td>
                            <td>{order?.user.phone} </td>
                        </tr>

                        <tr>
                            <td>created at</td>
                            <td>{moment(order?.created_at).format('yyyy-MM-DD H:mm')} </td>
                        </tr>

                    </tbody>
                </Table>
            </div>

            <div>

                <div className='fs-4 fw-bold'>order items</div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>product name</th>
                            <th>quantity</th>
                            <th>value</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            order?.order_items?.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td> <AllowedLink to={routes.productShow(item.product_id)}>{item.product?.name}</AllowedLink></td>
                                    <td>{item.quantity}</td>
                                    <td>{item.value}</td>

                                </tr>
                            )
                        }
                    </tbody>
                </Table>

            </div>

            <div className='fs-4 fw-bold'>location of customer</div>
            {
                order?.GPS ?
                    <iframe src={"https://maps.google.com/maps?q=" + order?.GPS?.lat + ",%20" + order?.GPS?.long + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}></iframe>
                    : null
            }

            <div className='d-flex justify-content-around'>

                <div className='w-25 pb-5'>
                    <div className='text-center fs-5'>Store Approval</div>
                </div>

                <div className='w-25 pb-5'>
                    <div className='text-center fs-5'>Customer Reception</div>
                </div>
            </div>
        </div >

    )
})
