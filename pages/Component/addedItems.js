import React,{useState,useEffect} from "react"
import GetDataQuery from "@/pages/api/fetchQuery";
import NavBar from "./nav"
import DataTable from "react-data-table-component"
import style from "../../styles/allOrder&&Products.module.css"
import {useRouter} from "next/router";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/pages/api/fireBase";

const AllAddedItem =()=>{
    if (typeof window !== 'undefined') {
        var item = sessionStorage.getItem('itemAdded')
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
    //---------------------------------------------------------------------------------(to get data projects use query firebase ).
    const[dataAddToStore,setDataAddToStore] =useState([])

    useEffect(()=>{
        GetDataQuery(`${user}/Input and output data/Input`,setDataAddToStore,100)
    },[])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const AllAddedItems = []
    dataAddToStore.forEach(e=>{
        if (e.items == item ){
            return AllAddedItems.push(e)
        }
    })
    //---------------------------------------------------------------------------------------(to send data to DataTable function).
    const columnRemoved = [
        {
            name:'Items',
            selector : row => <p className={row.delet?'opacity-50':false}>-{row.items}</p>,
            style : {
                backgroundColor : '#00bcd4',
                color : "black",
            }
        },
        {
            name:'Quantity',
            selector : row => <p className={row.delet?'opacity-50':false}>{row.qtn}</p>,
            style : {
                backgroundColor : '#9E9E9E',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'


            }
        },
        {
            name:'date',
            selector : row => <p style={row.oop === "مرتجع"?{color:'red'}: {color:'black'}}>{row.date}</p>,
            style : {
                backgroundColor : '#607d8b',
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
    return(
        <div className={style.contAllOrder}>

            <NavBar/>
            <div className='w-100'>
                <DataTable
                    columns={columnRemoved}
                    data={AllAddedItems}
                    pagination
                    customStyles={customeStyles}
                >
                </DataTable>
            </div>

        </div>
    )
}
export default AllAddedItem