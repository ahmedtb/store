import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function ProductsTable(props: { products: products, addColumns?: addColumns }) {
    const products = props.products
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{window.localization.name}</th>
                    <th>{window.localization.price}</th>
                    <th>{window.localization.description}</th>
                    <th>{window.localization.category}</th>
                    <th>{window.localization.quantity}</th>
                    <th>{window.localization.image}</th>

                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    products?.map((product, index) => (
                        <tr key={index}>

                            <td>
                                {product.id}
                            </td>

                            <td>
                                <AllowedLink to={routes.productShow(product.id)}>
                                    {product.name}
                                </AllowedLink>
                            </td>
                            <td>
                                {product.price}
                            </td>

                            <td>
                                {product.description}
                            </td>
                            <td>
                                {product.category?.name}
                            </td>
                            <td>
                                {product.quantity}
                            </td>
                            <td>
                                <img src={api.productImage(product.id)} width='100px' />
                            </td>

                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(product, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}