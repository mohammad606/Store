import React from 'react'
import { Container, Navbar} from 'react-bootstrap'
import style from "../../styles/navs.module.css"

export default function NavTow() {


    return (
        <Navbar bg="dark" data-bs-theme="dark" className={style.NavTow}>
            <Container >
                <Navbar.Brand href="/home" ><h2>Afak</h2></Navbar.Brand>
            </Container>
        </Navbar>
    )
}
