import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function BrandsTable(props: { brands: brands, addColumns?: addColumns }) {
    const brands = props.brands
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{window.localization.name}</th>


                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    brands?.map((brand, index) => (
                        <tr key={index}>

                            <td>
                                {brand.id}
                            </td>

                            <td>
                                <AllowedLink to={routes.brandShow(brand.id)}>

                                    {brand.name}
                                </AllowedLink>

                            </td>



                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(brand, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}