import {get, limitToLast, query, ref} from "firebase/database";
import {data} from "@/pages/api/fireBase";

const GetDataQuery =(path,value,limit)=>{
    //------------------------------------------------------------------------------------------(To get data with query firebase).
    const db = query(ref(data,`${path}`),limitToLast(limit))
    get(db)
        .then((s)=>{
            const allData = []
            s.forEach(ch=>{
                allData.push(ch.val())
            })
            value(allData)
        })
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}

export default GetDataQuery