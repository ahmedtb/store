import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { allowedRoutesType, stateType, childrenType } from './types'
import { LinkContainer } from 'react-router-bootstrap'
import pathInRoutes from './pathInRoutes'
import { Dispatch } from 'redux'

function AllowedLink(props: { to: string, className?: string, target?: string, children: childrenType, container?: boolean, allowedRoutes: allowedRoutesType, displayChildrenOnly?: boolean }) {
    const to = props.to
    const children = props.children
    const className = props.className
    const target = props.target

    const displayChildrenOnly = props.displayChildrenOnly
    const container = props.container

    const allowedRoutes = props.allowedRoutes

    return !pathInRoutes(allowedRoutes, to) ? (
        displayChildrenOnly ?
            <div>{children}</div> : null
    )
        :
        (container ?
            <LinkContainer target={target} className={className} to={to}>{children}</LinkContainer>
            :
            <Link target={target} className={className} to={to}>{children}</Link>)


}



const mapStateToProps = (state: { state: stateType }) => {
    return {
        allowedRoutes: state.state.allowedRoutes,
        user: state.state.user,

    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedLink)