import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function OrdersTable(props: { orders: orders, addColumns?: addColumns }) {
    const orders = props.orders
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>user</th>
                    <th>status</th>
                    <th>items</th>


                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    orders?.map((order, index) => (
                        <tr key={index}>

                            <td>
                                <AllowedLink to={routes.orderShow(order.id)}>
                                    {order.id}
                                </AllowedLink>
                            </td>


                            <td>
                                {order.user?.name}
                            </td>

                            <td>
                                {order.status}
                            </td>

                            <td className=''>
                                {
                                    order?.order_items?.map((item, index) => {

                                        return <div key={index} className='d-flex h-50 d-inline-block'>
                                            {item.product?.name} quantity {item.quantity} value {item.value}
                                        
                                        </div>
                                    })
                                }
                            </td>


                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(order, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}