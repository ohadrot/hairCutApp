import React from 'react'
import './popup.css'

export default function OneHour({time,setPickDay,bgcolor}) {
  return (
    <div style={{backgroundColor:bgcolor}} onClick={()=>{setPickDay(time)}} className='oneHour'>
        {time}
        </div>
  )
}
