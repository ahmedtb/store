import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function OrderItemsTable(props: { orderItems: orderItems, addColumns?: addColumns }) {
    const orderItems = props.orderItems
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{window.localization.name}</th>
                    <th>{window.localization.orderItemPrice}</th>


                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    orderItems?.map((orderItem, index) => (
                        <tr key={index}>

                            <td>
                                {orderItem.id}
                            </td>




                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(orderItem, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}