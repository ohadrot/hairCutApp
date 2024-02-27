import React,{useContext, useState} from 'react'
import AllData from '../ScheduleContext'
import OneMonth from './OneMonth'
import UserNextApp from './UserNextApp'
import './board.css'
import Button from 'react-bootstrap/Button';
import UserData from '../UserContext'
import back from '../img/backGround.jpg'
import AddNewCustomer from './AddNewCustomer'



export default function Board() {
 
  const {allYear,currentMonth,nextMonth,prevMonth,currentYear} = useContext(AllData)
  const {Admin} =useContext(UserData)
  
  const showUserNextAppWindow = ()=>{
    if(Admin == false) 
      return <UserNextApp/>
    else{
      return <AddNewCustomer/>
    }
  }
    
  return (
    <div style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover', filter: 'brightness(50%);'}}>
        <div className='header-of-Page'>
            <div>
              <h2 className='year'>{allYear[currentYear].year}</h2>
              <div className='switchMonthBtn'>
              <Button onClick={prevMonth}>prev Month</Button>
              <Button variant='primary' onClick={nextMonth}>next Month</Button>
              </div>
            </div>
            <div className='nextAppWindow'>
              {showUserNextAppWindow()}
            </div>
          </div>
        
        <OneMonth/>

    </div>
  )
}
