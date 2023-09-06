import React, { useEffect, useState } from 'react'
import { data } from "../api/fireBase"
import {set, ref, update} from "firebase/database"
import Fetch from '../api/fetchApi'
import { Button } from 'react-bootstrap'
import style from "../../styles/takeOutAndAdd.module.css"
import Calc from "@/pages/Component/calc/test";

const TakeOut = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        var user = localStorage.getItem('admin')

    }
    //-----------------------------------------------------------------------------------------------(to get data input to state).
    const [itme, setItem] = useState('')
    const [qtnOns, setQtnOns] = useState('')
    const [dateOns, setDate] = useState('')
    const [client,setClient] = useState('')
    const [sender,setSender] = useState('')
    const [noa,setNoa]=useState('')
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-------------------------------------------------------------------------(to get last qtn item selected from the data base).
    const [lastQtnFetch, setLastQtnFetch] = useState([])
    const [lastQtn, setlastQtn] = useState('')
    Fetch(`${user}/Store`, setLastQtnFetch)
    useEffect(() => {
        lastQtnFetch.forEach((e) => {
            for (let i = 0; i <= lastQtnFetch.length; i++) {
                if (e.key === itme) {
                    setlastQtn(e.qtn)
                }
            }
        })

    }, [itme])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //--------------------------------------------------------------------------(To handle data of input and Convert it to object).

    const [inputArr, setInputArr] = useState([])
    const [inputData, setInputData] = useState({
        name: '',
        qtn: '',
    })
    useEffect(() => {
        setItem(inputData.name)
        setQtnOns(inputData.qtn)

    })
    let { name, qtn } = inputData
    const handelAddtoOrder = () => {
        setInputArr([...inputArr, { name, qtn }])
        update(ref(data, `${user}/Store/${inputData.name}`), {
            qtn: Number(lastQtn) - Number(inputData.qtn), })
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-------------------------------------------------------------------------(To get the last order number added from database).
    const [lastOrderFetch, setLastOrderFetch] = useState([])
    Fetch(`${user}/Input and output data/Output`, setLastOrderFetch)
    var arrayKey = []

    lastOrderFetch.forEach(e=>{
        const key =[ Number(e.key)]
        arrayKey.push(...key)
    })

    const largestNumber = Math.max(...arrayKey) + 1;
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-------------------------------------------------------------------------------------(To handle send the order to database).
    const handleSendOrder = () => {

        const items = []
        const qtns = []
        inputArr.forEach((e) => {
            items.push(e.name)
            qtns.push(Number(e.qtn))
        })
        const allQtn = qtns.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        set(ref(data, `${user}/Input and output data/Output/${largestNumber}`), {
            id: largestNumber,
            items: items,
            qtn: qtns,
            date: dateOns,
            client:client,
            sender : sender,
            noa:noa,
            allQtn:allQtn
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);

    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //----------------------------------------------------------------------------------(To get last qtn and box size from Store).
    const [lastQtnItemArray, setLastQtnItemArray] = useState([])
    const [lastQtnItem, setLastQtnItem] = useState('')
    const [qntInBox,setQntInBox] = useState(0)
    Fetch(`${user}/Store/${inputData.name}`, setLastQtnItemArray)
    useEffect(() => {
        lastQtnItemArray.forEach(e => {
            if (e.key == inputData.name) {
                setLastQtnItem(e.qtn)
                setQntInBox(e.box)
            }
        })
    }, [inputData.name])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-----------------------------------------------(To find out how many boxes equals the number of pieces of the item in stock).
    const [box, setBox] = useState(0)
    const Filter = (bos)=>{
        if (lastQtnItem < bos) {
            const minBox = 0
            return setBox(minBox);
        } else {
            const maxBox = `${Math.floor(lastQtnItem / bos)} and ${lastQtnItem - (Math.floor(lastQtnItem / bos) * bos)} Piece`;
            setBox(maxBox);
        }
    }


    useEffect(() => {
        Filter(qntInBox)
    })

    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-------------------------------------(Determine a limit for entering items from the user based on their number in the store).
    const min = 0;
    const max = lastQtnItem;

    const [maxValueQtn, setValue] = useState(1);


    const handleChinge = (e) => {
        setInputData({
            ...inputData, [e.target.name]: e.target.value
        })
        const value = Math.max(min, Math.min(max, Number(e.target.value)));
        setValue(value);


    }

    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    return (
        <>
            <div className={style.contFormRemove}>
                <label htmlFor="item" className={style.labItem}>item :</label>
                <select name="name" id="item" value={inputData.item}
                    onChange={handleChinge}  required>
                    <option></option>
                    {lastQtnFetch.map(e=>(
                        <option value={e.key}>{e.key}</option>
                    ))}
                </select>
                <label htmlFor="date">Date</label>
                <input type="date" id='date' name='date'  onChange={e=>setDate(e.target.value)} required/>
                <label htmlFor="quantity">Quantity : <p className='qtn'>Piece : {lastQtnItem}</p><p className='qtn'>Box : {box}</p></label>
                <input type="number" id='quantity' name='qtn' value={maxValueQtn} onChange={handleChinge} placeholder='Quantity ...' required/>
                <label htmlFor="Noa">The order number is with the accountant</label>
                <input type="text" id='Noa' name='Noa' onChange={e=>setNoa(e.target.value)} placeholder='Name of Client ...' required/>
                <label htmlFor="client">Client</label>
                <input type="text" id='client' name='client' onChange={e=>setClient(e.target.value)} placeholder='Name of Client ...' required/>
                <label htmlFor="Sender">Sender</label>
                <input type="text" id='Sender' name='Sender' onChange={e=>setSender(e.target.value)} placeholder='Name of Client ...' required/>


                <Button onClick={handelAddtoOrder} variant="info" className='mt-2'>Add to Orde</Button>
            </div>
            <div>
                <table border={1} callPadding={10} className={style.tableOrder}>
                    <thead>
                        <tr>
                            <td>Item </td>
                            <td>Quantity</td>
                            <td>date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inputArr.map(
                                (info, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>{info.name} </td>
                                            <td>{info.qtn}</td>
                                            <td>{info.date}</td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
                <Button onClick={handleSendOrder} variant="success" className='mt-2'>Save Order</Button>
                <div className='w-100 h-50 mt-4'>
                    <Calc/>
                </div>
            </div>

        </>

    )
}
export default TakeOut

