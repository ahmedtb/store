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
                                {order.id}
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