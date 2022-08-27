import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function AdminsTable(props: { admins: admins, addColumns?: addColumns }) {
    const admins = props.admins
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{window.localization.name}</th>
                    <th>{window.localization.username}</th>


                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    admins?.map((admin, index) => (
                        <tr key={index}>

                            <td>
                                {admin.id}
                            </td>

                            <td>
                                <AllowedLink to={routes.adminShow(admin.id)}>

                                    {admin.name}
                                </AllowedLink>

                            </td>

                            <td>
                                {admin.username}
                            </td>


                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(admin, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}