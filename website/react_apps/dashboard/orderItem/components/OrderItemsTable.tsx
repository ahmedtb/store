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
                    <th>{window.localization.product}</th>
                    <th>{window.localization.order}</th>

                    <th>{window.localization.user}</th>
                    <th>{window.localization.quantity}</th>
                    <th>{window.localization.value}</th>


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
                            <td>
                                <AllowedLink to={routes.productShow(orderItem.product_id)}>
                                    {orderItem.product?.name}
                                </AllowedLink>
                            </td>
                            <td>
                                {orderItem.order_id}
                            </td>
                            <td>
                                <AllowedLink to={routes.orderShow(orderItem.order_id)}>
                                    {orderItem.order?.user?.name}
                                </AllowedLink>
                            </td>
                            <td>
                                {orderItem.quantity}
                            </td>
                            <td>
                                {orderItem.value}
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