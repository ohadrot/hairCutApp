import React from 'react'
import Clock from './Clock'

export default function Title() {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h1>ScheduleApp</h1>
          <p style={{fontSize: '20px'}}>© ohad rothschild</p>
          <Clock/>
    </div>
  )
}
