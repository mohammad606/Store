import React, {useState} from 'react'
import { Container, Nav, Navbar ,OverlayTrigger ,Tooltip} from 'react-bootstrap'
import { signOut } from "firebase/auth"
import { auth } from '../api/fireBase'
import Swal from 'sweetalert2';
import style from "../../styles/navs.module.css"



export default function NavBar() {

  //-------------------------------------------------------------------------------------------------(To handle log out button).
  const logOut = () => {

      Swal.fire({
        title: 'Are you sure?',
        text: "You want to leave!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          signOut(auth).then(() => {
            window.history.forward()
            window.location.href = "/";

          })
        }
    }).catch((error) => { console.log(error) })

  }
  //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <Navbar bg="dark" data-bs-theme="dark" className={style.nav}>
      <Container className={style.contDataNave}>
        <Navbar.Brand href="/home" className={style.siteName}>A</Navbar.Brand>
        <Nav className={style.contLink} >
          <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">Dash Bord</Tooltip>}
          >
          <Nav.Link href="/home">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house"
                 viewBox="0 0 16 16">
              <path
                  d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
            </svg>
          </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">All Orders</Tooltip>}
          >
          <Nav.Link href="/allOrder">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                 className="bi bi-card-list" viewBox="0 0 16 16">
              <path
                  d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path
                  d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>
          </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">All Products</Tooltip>}
          >
            <Nav.Link href="/allProducts">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                   className="bi bi-card-checklist" viewBox="0 0 16 16">
                <path
                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path
                    d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
              </svg>
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">Store</Tooltip>}
          >
            <Nav.Link href="/store">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                   className="bi bi-database" viewBox="0 0 16 16">
                <path
                    d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z"/>
              </svg>
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip-2">Log Out</Tooltip>}
          >
            <Nav.Link onClick={logOut}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                   className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
            </Nav.Link>
          </OverlayTrigger>
        </Nav>
      </Container>
    </Navbar>
  )
}

// const [lastOrderFetch, setLastOrderFetch] = useState([])
// Fetch(`${user}/Input and output data/Output`, setLastOrderFetch)
// var arrayKey = []
//
// lastOrderFetch.forEach(e=>{
//     const key =[ Number(e.key)]
//     arrayKey.push(...key)
// })
//
//  const largestNumber = Math.max(...arrayKey) + 1;
