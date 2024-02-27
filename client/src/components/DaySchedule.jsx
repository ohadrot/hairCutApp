import React,{useContext, useEffect, useState} from 'react'
import './popup.css'
import AllData from '../ScheduleContext'
import OneHour from './OneHour'
import UserData from '../UserContext'
import AppointmentTable from './AppointmentTable'
import { savaNewAppInTheDb } from '../serverReq/fetchFile'




export default function DaySchedule({freeApp,isVisible,setIsVisible,fullApp}) {
    const {allYear,currentMonth,currentYear,currentDay} = useContext(AllData)
    const {Admin,user,changeUser} = useContext(UserData)
    
  
    const [pickDay,setPickDay] = useState('0')
    const [showMsg,setShowMsg] = useState(false)
  
    

  
    const showMsgEror = ()=>{
      if(showMsg == true)
        return 'you have to choose time'
    }


    const showAllFreeAppointment =  ()=>{
        
        return freeApp.map((val)=>{
            if(val === pickDay)
                return <OneHour time = {val} setPickDay={setPickDay} bgcolor ={'green'}/>
            else
                return <OneHour time = {val} setPickDay={setPickDay} bgcolor ={'white'}/>

        })

    }

    const showAllTheAppointmen = ()=>{
      // let result = getAllTheAppointment(2024,currentMonth,currentDay);
      return <AppointmentTable allAppo = {fullApp}/>
    }

    const saveThisTimeForUser = ()=>{
        if(pickDay != '0'){
          savaNewAppInTheDb(2024,currentMonth,currentDay,pickDay,user._id);
          setPickDay('0');
          user.date.push(`2024/${currentMonth+1}/${currentDay} ${pickDay}`);
          console.log(user)
          setIsVisible(false)
          
        }
        else{
          setShowMsg(true)
        }

    }

    return (
        <div className={`popup ${isVisible ? 'visible' : ''}`}> 
        { Admin==false ?
          <div className="popup-content">
            <h1>{`${currentDay}/${currentMonth+1}/2024`}</h1>
            <div className='allHour'>
             {/* if i am user  */}
            {showAllFreeAppointment()} 
            </div>
            <p style={{color: 'red'}}>{showMsgEror()}</p>
            <button onClick={saveThisTimeForUser}>save this hour</button>
          </div>

        : <div>
          {/* // if i am admin */}
          <h1>{`${currentDay}/${currentMonth+1}/2024`}</h1>
          {showAllTheAppointmen()}
          </div>}
          <button onClick={()=>{ setPickDay('0');setIsVisible(false)}}>X</button>
        </div>
      );
}
