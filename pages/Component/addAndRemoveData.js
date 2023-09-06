import React,{useState} from "react"
import {Button, Offcanvas} from "react-bootstrap";
import TakeOut from "@/pages/Component/TakeOut";
import AddToStore from "@/pages/Component/addToStore";


const AddAndRemoveData = ({relod})=>{
    //---------------------------------------------------------------------------------(to handle show and hide input send order).
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return(
        <div className='contBtnPlus'>
            <Button variant="danger" onClick={handleShow1}>Create Order</Button>
            <Offcanvas show={show1} onHide={handleClose1} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Choose items</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <TakeOut/>
                </Offcanvas.Body>
            </Offcanvas>
            <Button variant="success" onClick={handleShow}>Add To Store</Button>
            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Choose items</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <AddToStore relod={relod}/>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

    )
}
export default AddAndRemoveData