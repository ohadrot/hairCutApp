import React,{useContext,useState,useEffect} from 'react'
import AllData from '../ScheduleContext'
import OneDay from './OneDay'
import DaySchedule from './DaySchedule'
import UserData from '../UserContext'




export default function OneMonth() {
    const {allYear,currentMonth,currentYear,currentDay} = useContext(AllData)
    const [isVisible,setIsVisible]= useState(false)
    const [freeApp, setFreeApo] =useState([])
    const [fullApp, setFullApo] =useState([])
    const {Admin,user} = useContext(UserData)
    const [greenDays,setGreenDays] = useState([])
    const [reload,setReload] = useState(false)
    
  
    useEffect(()=>{
          const fetchfreeData = async()=>{
          let result = await fetch(`/getAllTheFreeAppointmentOfDay?year=2024&month=${currentMonth+1}&day=${currentDay}`);
          let res = await result.json();
          setFreeApo(res);
          
    }

    const fetchAllAppOfTheDayData = async()=>{
      let result = await fetch(`/getAllTheAppointmentOfDay?year=2024&month=${currentMonth+1}&day=${currentDay}`);
      let res = await result.json();
      setFullApo(res);
      
}
    if(Admin == false)
    {
          fetchfreeData();
          
          let greenDaysTemp= user.date.map((val)=>{
            let x = new Date(val);
            return {month: x.getMonth(), day: x.getDate(), time: `${x.getHours()}:${x.getMinutes()}`}
          })
          setGreenDays([...greenDaysTemp]);
          

    }
    else{
      fetchAllAppOfTheDayData()
    }


    },[currentDay, isVisible])


    const showDaySchedule = ()=>{
      if(isVisible == true)
        return <DaySchedule fullApp={fullApp} freeApp={freeApp} isVisible = {isVisible} setIsVisible  = {setIsVisible} reload ={reload} setReload ={setReload}/>
      else{
        return null;
      }
    }
    
  return (
    <div>
        <h1 style={{display: 'inline', bottom: '10px', position: 'relative'}}>{allYear[currentYear].months[currentMonth].month}</h1>
        <div className='allDays'>
        {allYear[currentYear].months[currentMonth].days.map((day,idx)=>{
         if(freeApp.length == 0)
            return <OneDay setIsVisible ={setIsVisible} dayDetails = {day} greenDays = {greenDays}/>
          else
            return <OneDay setIsVisible ={setIsVisible} dayDetails = {day} greenDays = {greenDays}/>
           
          
        })}
        </div>
        {showDaySchedule()}
    </div>
  )
}
