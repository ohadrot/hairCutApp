import { createContext, useState,useEffect } from "react";
import { jsonExample } from "./yearDataForPractice";
const AllData = createContext();

export const AllYearProvider = ({children})=>{

    const {getAllYear} = require('./serverReq/fetchFile')    

    const [allYear, setAllYear] = useState({});
    const [currentMonth , setCurrentMonth] = useState(0)
    const [currentYear , setCurrentYear] = useState(0)
    const [currentDay , setCurrentDay] = useState(1);
    

    useEffect(()=>{
        fetch('/getallyear').then((res)=> res.json()).then((data)=>{
            setAllYear(data);
        })
        // setAllYear(jsonExample);
        let x = new Date();
        setCurrentMonth(x.getMonth());
    },[])

    const nextMonth = ()=>{
        setCurrentMonth(currentMonth +1);
    }
    const prevMonth = ()=>{
        setCurrentMonth(currentMonth -1);
    }

    return (
        <AllData.Provider value={{allYear,currentMonth,nextMonth,prevMonth,currentYear,currentDay,setCurrentDay}}>
            {children}
        </AllData.Provider>
    )
}

export default AllData;