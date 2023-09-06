import React,{useEffect, useState}  from 'react';
import GetDataQuery from "@/pages/api/fetchQuery";
import style from "../../styles/allOrder&&Products.module.css"
import NavBar from "@/pages/Component/nav";
import {Button} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Fetch from "@/pages/api/fetchApi";
import Swal from "sweetalert2";
import {ref, update} from "firebase/database";
import {data} from "@/pages/api/fireBase";

const OrderOfItem =()=>{
    if (typeof window !== 'undefined') {
        var item = window.sessionStorage.getItem('OrderItem')
        var user = localStorage.getItem('admin')
    }
    //--------------------------------------------------------------------------------------- loop in the databise and get order
    const [dataOrderSend,setdataOrderSend]= useState([])
    useEffect(()=>{
        GetDataQuery(`${user}/Input and output data/Output`,setdataOrderSend,200)
    },[])
    var allOrder = []
    dataOrderSend.forEach(e=>{
        var arrayitem =[...e.items]
        arrayitem.forEach(f=>{
            if(f == item ){
                allOrder.push(e)
            }
        })
    })
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //---------------------------------------------------------------------------------------(to send data to DataTable function).
    const columnRemoved = [
        {
            name:'Items',
            selector : row => {
                const itemArray = [...row.items]
                return  itemArray.map((e)=>{
                    return(
                        <p className={row.delet?'opacity-50':false}>-{e}</p>
                    )
                })
            },
            style : {
                backgroundColor : '#00bcd4',
                color : "black",
            }
        },
        {
            name:'Quantity',
            selector : row => {
                const qtnArray = [...row.qtn]
                return  qtnArray.map((e)=>{
                    return(
                        <p className={row.delet?'opacity-50':false}>{e}</p>
                    )
                })
            },
            style : {
                backgroundColor : '#9E9E9E',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'


            }
        },
        {
            name:'Sender',
            selector : row => row.sender,
            style : {
                backgroundColor : 'darkkhaki',
                color : "black",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'client',
            selector : row => row.client,
            style : {
                backgroundColor : '#8bc34a',
                color : "black",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'date',
            selector : row => row.date,
            style : {
                backgroundColor : '#607d8b',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'Noa',
            sortable:true,
            selector : row => row.noa,
            style : {
                backgroundColor : '#9e9e9e',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'Order Number',
            sortable:true,
            selector : row => row.id,
            style : {
                backgroundColor : '#212529',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'Delete',
            selector : row =>{
                return(
                    <Button variant="outline-secondary" onClick={() => {
                        handleRemoveOrder(row.id,row.items,row.qtn)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-trash3"
                             viewBox="0 0 16 16">
                            <path
                                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </Button>
                )
            },
            style : {
                backgroundColor : '#bdb76b',
                display:'flex',
                justifyContent: 'center',
            }
        }

    ]
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-------------------------------------------------------------------------------------------------------(to Style DataTable).
    const customeStyles = {
        headRow : {
            style : {
                backgroundColor : '#212529',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'
            }
        },
        row:{
            style : {
                backgroundColor : 'black',
                color : "#fff"
            }
        },
        cells : {
            style : {
                backgroundColor : '#fff',
                color : "black",
                fontSize:'15px',
                fontWeight:'600',
                padding:'10px'

            }
        },
        pagination:{
            style : {
                backgroundColor : 'gray',
                color : "black",
                fontSize:'15px',
            }
        },
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //--------------------------------------------------------------------------------------------------------- handleRemoveOrder
    const [store,setStore] = useState([])
    Fetch(`${user}/Store`,setStore)
    const handleRemoveOrder = (id,items,qtn)=>{
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
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 1000);
                    }
                })

            }
        })
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return(
        <>
            <div className={style.contAllOrder}>

                <NavBar/>
                <div className='w-100'>
                    <DataTable
                        columns={columnRemoved}
                        data={allOrder}
                        pagination
                        customStyles={customeStyles}
                    >
                    </DataTable>
                </div>

            </div>
        </>
    )
}
export default OrderOfItem