import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function UsersTable(props: { users: users, addColumns?: addColumns }) {
    const users = props.users
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{window.localization.name}</th>
                    <th>{window.localization.email}</th>
                    <th>{window.localization.phone}</th>

                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    users?.map((user, index) => (
                        <tr key={index}>

                            <td>
                                {user.id}
                            </td>

                            <td>
                                <AllowedLink to={routes.userShow(user.id)}>

                                    {user.name}
                                </AllowedLink>

                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.phone}
                            </td>


                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(user, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}