import React, { useState,useContext } from 'react'
import AllData from '../ScheduleContext'
import './oneDay.css'




export default function OneDay({dayDetails,setIsVisible,greenDays}) {
    const {setCurrentDay,currentMonth} = useContext(AllData)

    const openDay = ()=>{
      setCurrentDay(dayDetails.day);
      setIsVisible(true);
    }

    const showTheHour = ()=>{
      let res = greenDays.filter((val)=>{ return currentMonth== val.month && val.day == dayDetails.day});
      if(res.length == 0)
        return null;
      else{
        let time = res[0].time.substring(res[0].time.indexOf(':')+1) != '0' ? <p style={{backgroundColor: 'yellowgreen', border: '1px solid black'}}>{res[0].time}</p>
        : <p style={{backgroundColor: 'yellowgreen', border: '1px solid black'}}>{`${res[0].time}0`}</p>
        return time;
      }
    }

  return (
    <div onClick={openDay}>
        <div className='oneDay'>
            <h5>{dayDetails.day}</h5>
            <button className='circle'></button>
            <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            {showTheHour()}
            </div>
        </div>
        
    </div>
  )
}
