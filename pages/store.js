import React, { useState ,useEffect} from "react";
import NavBar from "./Component/nav";
import Fetch from "./api/fetchApi";
import Swal from 'sweetalert2';
import {auth, data} from "./api/fireBase"
import { ref, remove, update} from "firebase/database"
import {Button} from 'react-bootstrap'
import style from "../styles/store.module.css"
import {useRouter} from "next/router";
import {onAuthStateChanged} from "firebase/auth";



const Store = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        var user = localStorage.getItem('admin')

    }
    //--------------------------------------------------------------------------- (To ensure that the user has access to the page).
    const router = useRouter()
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return true
            }else {
                console.log('no user')
                return router.push('/404')
            }
        } )
    },[])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-----------------------------------------------------------------------------------------------------(Access to store data).
    const [store, setStore] = useState([])
    Fetch(`${user}/Store`, setStore)
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //----------------------------------------------------------------------------------- (to hundle add items and add new items).
    const [items, setItem] = useState('')
    const [qtn, setQtn] = useState('')

    const [newItems,setNewItems] = useState('')
    const [newqtnItem , setNewQtnItem] = useState('')
    const [qtnInBox,setQtnInBox] = useState('')

    const addForm = (items,qtn,e) => {
        e.preventDefault()
        update(ref(data, `${user}/Store/${items}`), {
            qtn: Number(qtn),

        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The product has been added',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }
    const addNewForm = (items,qtn,box) => {
        update(ref(data, `${user}/Store/${items}`), {
            qtn: Number(qtn),
            box:Number(box),
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The product has been added',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //----------------------------------------------------------------------------------- (to hundle remove items from the store).
    const handleRemoveItemFromStore = (id)=>{
        Swal.fire({
            title: '"Are you sure you want to delete the product?"',
            text: "If you remove it, it will be removed from the repository",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                remove(ref(data, `${user}/Store/${id}`))
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            }
        })
    }
    const handlePrint = () => {
        const orderDiv = document.getElementById('store').innerHTML
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Print</title></head > <body>');
        printWindow.document.write(orderDiv);
        printWindow.document.write('</body></html > ');
        printWindow.document.close();
        printWindow.print();
    };
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const handleShowAllOrder = (item)=>{
        window.sessionStorage.setItem("OrderItem",item)
        setTimeout(() => {
            window.location.href = "/Component/orderOfItem"
        }, 1000)
    }
    const handleShowAllItemAdded = (item)=>{
        window.sessionStorage.setItem("itemAdded",item)
        setTimeout(() => {
            window.location.href = "/Component/addedItems"
        }, 1000)
    }


    return (
        <div className={style.contPageStore}>
            <NavBar />
            <div className='w-100'>

                <div className={style.constNameStore}>
                    <h2>Store</h2>
                    <div className='lin'></div>
                    <Button variant="outline-secondary" onClick={handlePrint} className='mt-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" className="bi bi-printer"
                                                        viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                        <path
                            d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                    </svg>
                    </Button>
                </div>
                <div className={style.contStore}  id='store'>
                    <table style={{width:"90%"}}>
                        <thead >
                        <tr style={{border:"2px solid",width:"30%",backgroundColor:"#004156",textAlign:"center",color:"#fff"}}>
                            <td>Items</td>
                            <td>Quantity</td>
                            <td>Box</td>
                            <td>Delete</td>
                            <td>Order</td>
                            <td>Added</td>
                        </tr>
                        </thead>
                        <tbody>
                        {store.map(e => {
                            if (e.qtn === 0) {
                                return (
                                    <tr  key={e.key}  style={{border:"2px solid #fff",width:"30%",backgroundColor:" #c1d0d4",textAlign:"center"}}>
                                        <td >{e.key}</td>
                                        <td className="red">{e.qtn}</td>
                                        <td className="red">{Math.floor(e.qtn / e.box)}</td>
                                        <td className="red">
                                            <Button variant="outline-secondary" onClick={() => {
                                                handleRemoveItemFromStore(e.key)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                </svg>

                                            </Button>
                                        </td>
                                        <td className="red">
                                            <Button variant="outline-secondary" onClick={() => {
                                                handleShowAllOrder(e.key)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                                     className="bi bi-card-list" viewBox="0 0 16 16">
                                                    <path
                                                        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                    <path
                                                        d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => {
                                                handleShowAllItemAdded(e.key)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                                     className="bi bi-card-checklist" viewBox="0 0 16 16">
                                                    <path
                                                        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                    <path
                                                        d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                                </svg>
                                            </Button>
                                        </td>

                                    </tr>

                                )
                            }
                            return (
                                <tr key={e.key}  style={{border:"2px solid #fff",width:"30%",backgroundColor:" #c1d0d4",textAlign:"center"}}>
                                    <td id="name" >{e.key}</td>
                                    <td>{e.qtn}</td>
                                    <td>{Math.floor(e.qtn / e.box)} Plus/ {e.qtn-Math.floor(e.qtn / e.box)*e.box}</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => {
                                            handleRemoveItemFromStore(e.key)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path
                                                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                        </svg>

                                    </Button>
                                    </td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => {
                                            handleShowAllOrder(e.key)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                                 className="bi bi-card-list" viewBox="0 0 16 16">
                                                <path
                                                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                <path
                                                    d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => {
                                            handleShowAllItemAdded(e.key)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                                 className="bi bi-card-checklist" viewBox="0 0 16 16">
                                                <path
                                                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                <path
                                                    d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-around mt-4 flex-wrap'>
                    <div className={style.constAddDataToStore}>
                        <h3>Input Data</h3>
                        <form action="">
                            <label htmlFor="item" className={style.labItem}>item :</label>
                            <select name="item" id="item" onChange={e => setItem(e.target.value)} required>
                                <option></option>
                                {store.map(e=>(
                                    <option value={e.key}>{e.key}</option>
                                ))}
                            </select>
                            <label htmlFor="quantity" placeholder='Quantity ...'>Quantity :</label>
                            <input type="number" id='quantity' onChange={e => setQtn(e.target.value)}  placeholder='Quantity ...' required/>
                            <Button onClick={(e)=>addForm(items,qtn,e)}  variant="outline-primary">Add Item</Button>
                        </form>
                    </div>
                    <div className={style.constAddDataToStore}>
                        <h3>Input New Items</h3>
                        <form action="">
                            <label htmlFor="item" className={style.labItem}>item :</label>
                            <input name="item" id="item" onChange={e => setNewItems(e.target.value)} placeholder='New Item...' required/>
                            <label htmlFor="quantity">Quantity :</label>
                            <input type="number" id='quantity' onChange={e => setNewQtnItem(e.target.value)}  placeholder='Quantity ...' required/>
                            <label htmlFor="box">Quantity In Th Box :</label>
                            <input type="number" id='box' onChange={e => setQtnInBox(e.target.value)}  placeholder='Quantity in box...' required/>
                            <Button onClick={()=>addNewForm(newItems,newqtnItem,qtnInBox)} variant="outline-primary">Add Item</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Store