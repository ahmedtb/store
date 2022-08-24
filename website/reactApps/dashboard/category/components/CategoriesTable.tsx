import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function CategoriesTable(props: { categories: categories, addColumns?: addColumns }) {
    const categories = props.categories
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{window.localization.name}</th>
                    <th>{window.localization.categoryPrice}</th>
                    <th>{window.localization.categoryOfCategory}</th>
                    <th>{window.localization.description}</th>
                    <th>{window.localization.creator}</th>

                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    categories?.map((category, index) => (
                        <tr key={index}>

                            <td>
                                {category.id}
                            </td>

                            <td>
                                <AllowedLink to={routes.categoryShow(category.id)}>

                                    {category.name}
                                </AllowedLink>

                            </td>



                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(category, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}