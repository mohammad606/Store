import {useEffect} from "react";

const Fetch = (path, value) => {
    //--------------------------------------------------------------------------------------------------(To data with Fetch method).
    useEffect(() => {
        getDataToHome()
    }, [])

    function getDataToHome() {
        const fetchDataH = async () => {
            const res = await fetch(`https://math-35265-default-rtdb.firebaseio.com/${path}.json`);

            const dat = await res.json();
            const ObjDataHome = {...dat};
            const foodListData = [];
            for (const key in ObjDataHome) {
                if (!ObjDataHome[key]) {
                    continue;
                }
                foodListData.push({
                    key: key,
                    items: ObjDataHome[key].items,
                    qtn: ObjDataHome[key].qtn,
                    date: ObjDataHome[key].date,
                    box:ObjDataHome[key].box
                });
            }

            value(foodListData)

        }
        fetchDataH()

    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}
export default Fetch