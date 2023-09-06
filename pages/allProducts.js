import React,{useState,useEffect} from "react"
import {Button} from "react-bootstrap";
import GetDataQuery from "@/pages/api/fetchQuery";
import NavBar from "./Component/nav"
import DataTable from "react-data-table-component"
import style from "../styles/allOrder&&Products.module.css"
import {useRouter} from "next/router";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/pages/api/fireBase";

const AllOrder =()=>{
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
    //---------------------------------------------------------------------------------(to get data projects use query firebase ).
    const[dataAddToStore,setDataAddToStore] =useState([])

    useEffect(()=>{
        GetDataQuery(`${user}/Input and output data/Input`,setDataAddToStore,100)
    },[])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
            name:'client',
            selector : row => row.client?<p>{row.client}</p>:"",
            style : {
                backgroundColor : 'darkkhaki',
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
    //-----------------------------------------------------------------------------------(to handle search input with name items).
    const[inputSearch,setInputSearch] = useState('')
    const hundleSearch =()=> {
        const newData = dataAddToStore.filter(e => e.items.toLowerCase().includes(inputSearch.toLowerCase()))
        setDataAddToStore(newData)
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return(
        <div className={style.contAllOrder}>

            <NavBar/>
            <div className='w-100'>
                <form className={style.formSearch}>
                    <div>
                        <input type='text' onChange={e=>setInputSearch(e.target.value)} placeholder='Search ...'/>
                        <Button variant="dark" onClick={hundleSearch}>Search</Button>
                    </div>
                </form>
                <DataTable
                    columns={columnRemoved}
                    data={dataAddToStore}
                    pagination
                    customStyles={customeStyles}
                >
                </DataTable>
            </div>

        </div>
    )
}
export default AllOrder