import React, { useState, useEffect } from 'react'
import { data } from "../api/fireBase"
import {set, ref, update} from "firebase/database"
import Fetch from "../api/fetchApi"
import Swal from 'sweetalert2';
import style from "../../styles/takeOutAndAdd.module.css"
import Calc from "@/pages/Component/calc/test";

const AddToStore = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        var user = localStorage.getItem('admin')

    }
    //-----------------------------------------------------------------------------------------------(to get data input to state).
    const [operationType,setOperationType] = useState('')
    const [items, setItem] = useState('')
    const [qtn, setQtn] = useState('')
    const [date, setDate] = useState('')
    const [client,setclient] = useState('')
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //-------------------------------------------------------------------------(to get last qtn item selected from the data base).
    const [lastQtnFetch, setLastQtnFetch] = useState([])
    const [lastQtn, setlastQtn] = useState('')
    Fetch(`${user}/Store`, setLastQtnFetch)
    useEffect(() => {
        lastQtnFetch.forEach((e) => {
            for (let i = 0; i <= lastQtnFetch.length; i++) {
                if (e.key === items) {
                    setlastQtn(e.qtn)
                }
            }
        })

    }, [items])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //-----------------------------------------------------------------(To get the last order number added from database and + 1 ).
    const [lastOrderFetch, setLastOrderFetch] = useState([])
    Fetch(`${user}/Input and output data/Input`, setLastOrderFetch)
    var arrayKey = []

    lastOrderFetch.forEach(e=>{
        const key =[ Number(e.key)]
        arrayKey.push(...key)
    })

    const largestNumber = Math.max(...arrayKey) + 1;
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //---------------------------------------------------------------------------------(To handle send data projects to database).
    const addForm = (e) => {
        e.preventDefault()
        set(ref(data, `${user}/Input and output data/Input/${largestNumber}`), {
            id: largestNumber,
            oop:operationType,
            items: items,
            qtn: qtn,
            date: date,
            client:client
        })

        update(ref(data, `${user}/Store/${items}`), {
            qtn: Number(lastQtn) + Number(qtn),
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
    return (
        <div>
            <form onSubmit={addForm} className={style.contFormAdd}>
                <label htmlFor="OperationType" className={style.labItem}>Operation Type :</label>
                <select name="OperationType" id="OperationType" onChange={e => setOperationType(e.target.value)} required>
                    <option></option>
                    <optgroup label="الهملية">
                        <option value="نتاج">انتاج</option>
                        <option value="مرتجع">مرتجع</option>
                    </optgroup>
                </select>
                <label htmlFor="item" className={style.labItem}>item :</label>
                <select name="item" id="item" onChange={e => setItem(e.target.value)}  required>
                    <option></option>
                {lastQtnFetch.map(e=>(
                        <option value={e.key}>{e.key}</option>
                ))}
                </select>
                <label htmlFor="quantity">Quantity :</label>
                <input type="number" id='quantity' onChange={e => setQtn(e.target.value)} placeholder='Quantity ...' required />
                <label htmlFor="date">Date</label>
                <input type="date" id='date' onChange={e => setDate(e.target.value)} required />
                {operationType == "مرتجع"?
                    <>
                        <label htmlFor="client">client</label>
                        <input type="text" id='client' onChange={e => setclient(e.target.value)} required /></>
                    :false
                }
                <button type='submit'>Add Item</button>
            </form>
            <div className='w-100 h-50 mt-4'>
                <Calc/>
            </div>
        </div>
    )
}
export default AddToStore