import React from "react"
import { Table } from "react-bootstrap"
import AllowedLink from "../../components/AllowedLink"
import { routes, api } from "../../functions/urls"

export default function SlidesTable(props: { slides: slides, addColumns?: addColumns }) {
    const slides = props.slides
    const addColumns = props.addColumns




    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{window.localization.image}</th>
                    <th>{window.localization.to}</th>

                    {
                        addColumns?.map((column, index2) => (
                            <th key={index2}>{column.title}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    slides?.map((slide, index) => (
                        <tr key={index}>

                            <td>
                                {slide.id}
                            </td>

                            <td>
                                <img src={api.slideImage(slide.id)} width='100px' />
                            </td>
                            <td>
                                {slide.to}
                            </td>

                            {
                                addColumns?.map((column, index2) => (
                                    <td key={index2}>{column.content(slide, index)}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )

}