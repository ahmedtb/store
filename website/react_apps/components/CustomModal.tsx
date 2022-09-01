import React from 'react'
import { Button, Modal } from 'react-bootstrap'


export default function CustomModal(props: { label: string, children: childrenType, buttonClass?: string }) {
    const label = props.label
    const children = props.children
    const buttonClass = props.buttonClass

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className={buttonClass} onClick={handleShow}>
                {label}
            </button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleClose}>
                        {window.localization['close']}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}