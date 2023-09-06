import React, {useState,useEffect} from 'react'
import NavBar from "./Component/nav"
import {Button} from 'react-bootstrap'
import Swal from 'sweetalert2';
import { ref, update} from "firebase/database";
import GetDataQuery from "@/pages/api/fetchQuery";
import AddAndRemoveData from "@/pages/Component/addAndRemoveData";
import Fetch from './api/fetchApi'
import NavTow from "@/pages/Component/navTow";
import style from "../styles/home.module.css"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/pages/api/fireBase";
import {useRouter} from "next/router";
import {data} from "./api/fireBase"

export default function Home() {
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
                console.log('no user is here')
                return router.push('/404')
            }
        } )
    },[])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //------------------------------------------------------------------------------------------------------(to reload data Fetch).
    const [relodData,setRelodData] = useState(0)
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //----------------------------------------------------------------------------------------(to get data of Order and projects).
    const[dataAddToStore,setDataAddToStore] =useState([])
    const [dataOrderSend,setdataOrderSend]= useState([])
    useEffect(()=>{
        GetDataQuery(`${user}/Input and output data/Output`,setdataOrderSend,4)
        GetDataQuery(`${user}/Input and output data/Input`,setDataAddToStore,8)
    },[relodData])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //--------------------------------------------------------------------------------------------------(to handle button Print ).
    const handlePrint = (id) => {
        const orderDiv = document.getElementById(id).innerHTML
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Print</title></head > <body>');
        printWindow.document.write(orderDiv);
        printWindow.document.write('</body></html > ');
        printWindow.document.close();
        printWindow.print();
    };
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //--------------------------------------------------------------------------(get data from the Store to get last qtn in item).
    const [store,setStore] = useState([])
    Fetch(`${user}/Store`,setStore)
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //------------------------------------------------------------------------------------------- (to handle remove order button).
    const handleRemoveOrder = (id,items,qtn) => {
        Swal.fire({
            title: "Are you sure you want to delete the order?",
            text: "If you remove it, it will be returned to the repository !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dataOrderSend.forEach((e)=>{
                    if(e.id === id){
                        update(ref(data, `${user}/Input and output data/Output/${e.id}`), {
                            delet:true
                        })
                        store.forEach((e)=>{
                            items.forEach(f=>{
                                qtn.forEach(q=>{
                                    if(e.key == f && items.indexOf(f) == qtn.indexOf(q)){
                                        update(ref(data,`${user}/Store/${e.key}`),{
                                            qtn: Number(e.qtn) + Number(q)
                                        });
                                    }
                                })
                            })
                        })
                        setRelodData(1)
                    }
                })

            }
        })
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-------------------------------------------------------------------------------------(to handle remove data added projects).
    const handleRemoveAddedItem = (id,items,qtn) => {
        Swal.fire({
            title: 'Are you sure you want to delete the added product?',
            text: "If you remove it, it will be removed from the repository !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dataAddToStore.forEach((e)=>{
                    if(e.id === id){
                        update(ref(data, `${user}/Input and output data/Input/${e.id}`), {
                            delet:true
                        })
                        store.forEach(e=>{
                            if(e.key == items){
                                update(ref(data,`${user}/Store/${items}`),{
                                    qtn: e.qtn - qtn
                                });
                            }
                        })

                        setRelodData(2)
                    }
                })
            }
        })
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return (
        <>
            <svg  style={{position:'absolute',top:'50px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,224L11.4,213.3C22.9,203,46,181,69,181.3C91.4,181,114,203,137,229.3C160,256,183,288,206,272C228.6,256,251,192,274,170.7C297.1,149,320,171,343,186.7C365.7,203,389,213,411,192C434.3,171,457,117,480,128C502.9,139,526,213,549,213.3C571.4,213,594,139,617,138.7C640,139,663,213,686,250.7C708.6,288,731,288,754,282.7C777.1,277,800,267,823,250.7C845.7,235,869,213,891,218.7C914.3,224,937,256,960,250.7C982.9,245,1006,203,1029,192C1051.4,181,1074,203,1097,208C1120,213,1143,203,1166,202.7C1188.6,203,1211,213,1234,229.3C1257.1,245,1280,267,1303,229.3C1325.7,192,1349,96,1371,96C1394.3,96,1417,192,1429,240L1440,288L1440,0L1428.6,0C1417.1,0,1394,0,1371,0C1348.6,0,1326,0,1303,0C1280,0,1257,0,1234,0C1211.4,0,1189,0,1166,0C1142.9,0,1120,0,1097,0C1074.3,0,1051,0,1029,0C1005.7,0,983,0,960,0C937.1,0,914,0,891,0C868.6,0,846,0,823,0C800,0,777,0,754,0C731.4,0,709,0,686,0C662.9,0,640,0,617,0C594.3,0,571,0,549,0C525.7,0,503,0,480,0C457.1,0,434,0,411,0C388.6,0,366,0,343,0C320,0,297,0,274,0C251.4,0,229,0,206,0C182.9,0,160,0,137,0C114.3,0,91,0,69,0C45.7,0,23,0,11,0L0,0Z"></path></svg>
            <NavTow/>
            <div className={style.contAllSite}>
                <NavBar/>
                <div className={style.contentHome}>
                    <AddAndRemoveData relod={setRelodData}/>
                    <div className='lin'></div>
                    <div className={style.contData}>
                        <div className={style.contRemoveOrder}>
                            <h2 >Order Send</h2>
                            <div className={style.removeOrder}>
                                {dataOrderSend?.map((e) => {
                                    const Items = [...e.items]
                                    const qtn = [...e.qtn]
                                    const arrIter = qtn[Symbol.iterator]();
                                    return (
                                        <div className={e.delet?style.delet:style.contenarDataSending}>
                                            {e.delet? <div
                                                className='position-absolute w-100 h-100 d-flex justify-content-center align-items-center'>
                                                <strong className={style.deletetItemStrong}>Deleted</strong></div>
                                            :false}
                                            <div className={style.contBtn}>
                                                <Button variant="outline-secondary" onClick={() => {
                                                    handlePrint(e.id)
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-printer"
                                                         viewBox="0 0 16 16">
                                                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                                                        <path
                                                            d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                                                    </svg>
                                                </Button>
                                                <Button variant="outline-secondary" onClick={() => {
                                                    handleRemoveOrder(e.id, Items, qtn, e.date, e.client)
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-trash3"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                    </svg>
                                                </Button>

                                            </div>
                                            <div className={style.contenarOrder} id={e.id}>
                                                <div style={{display:"flex",justifyContent:"space-between",backgroundColor:"#c1d0d4",padding:"0px 6px",borderTop:"1px solid #00000040"}} >
                                                    <p>Order Number : {e.id}</p>
                                                    <p>Noa : {e.noa}</p>
                                                    <p>{e.date}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:"space-between",backgroundColor:"#c1d0d4",padding:"0px 6px",borderTop:"1px solid #00000040"}}>
                                                    <p>client : {e.client}</p>
                                                    <p>Sender : {e.sender}</p>
                                                </div>
                                                <table key={e.key} className={style.order} style={{width: '100%'}}>

                                                    <thead style={{
                                                        color: "#fff",
                                                        backgroundColor: '#004156',
                                                        width: '100%'
                                                    }}>
                                                    <tr>
                                                        <td>Items</td>
                                                        <td>Quantity</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody style={{backgroundColor: '#c1d0d4'}}>
                                                    {
                                                        Items?.map(f => {

                                                            return (
                                                                <tr>
                                                                    <td>{f}</td>
                                                                    <td>{arrIter.next().value}</td>
                                                                </tr>
                                                            )
                                                        })

                                                    }
                                                    <tr ><td colspan="2">pieces : {e.allQtn}</td></tr>

                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    )


                                })}
                            </div>
                        </div>
                        <div className={style.linHome}></div>
                        <div className={style.contAddItem}>
                            <h2>Items Add</h2>
                            <div className={style.AddItem}>
                                {dataAddToStore?.map((e) => {
                                    return e ? (
                                        <div className={e.delet?style.delet:style.contenarDataSending}>
                                            {e.delet?
                                                <div
                                                className='position-absolute w-100 h-100 d-flex justify-content-center align-items-center'>
                                                <strong className={style.deletetItemStrong}>Deleted</strong></div>
                                            :false}
                                            <div
                                                className={`${e.oop == 'مرتجع' ? `${style.contBtn} red z-index-2 justify-content-between pb-2` : `${style.contBtn} justify-content-between pb-2`}`}>


                                                <Button variant="outline-secondary" onClick={() => {
                                                    handleRemoveAddedItem(e.id, e.items, e.qtn, e.date)
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" className="bi bi-trash3"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                    </svg>

                                                </Button>
                                                <p className='text-center m-0'>{e.date}</p>
                                                {e.client?<p>client : {e?.client}</p>:false}
                                                <p>{e.oop == 'مرتجع' ? `Returned :  ${e.id} ` : `Batch number : ${e.id}`}</p>
                                            </div>

                                            <table className={style.AddItems}>
                                                <thead>
                                                <tr>
                                                    <td>Item</td>
                                                    <td>Quantity</td>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                <tr key={e?.key}>
                                                    <td>{e?.items}</td>
                                                    <td>{e?.qtn}</td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    ) : "";
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}



































