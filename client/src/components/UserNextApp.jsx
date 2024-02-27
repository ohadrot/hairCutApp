import React,{useContext, useState} from 'react'
import './userNextApp.css'
import UserData from '../UserContext'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {cancelAppointment} from '../serverReq/fetchFile'
import AllData from '../ScheduleContext';
export default function UserNextApp() {

const {user,changeUser} = useContext(UserData)
const [moreDetailsFlag,setMoreDetailsFlag] = useState(false); 
const [reload,setRelaod] = useState(false)





const cancelApp = (time,date,idx = 0,flag = true)=>{ //if true - remove the first, false- remove by index 
  time = time.substring(1);
  let appointment = {
    time: time,
    userId: user._id
  } 
  date = date.substring(date.indexOf('-')+1)
  let month = date.substring(0,date.indexOf('-'));
  let day = date.substring(date.indexOf('-')+1);
  cancelAppointment(appointment,month,day,'2024');
  console.log(flag)
  if(flag)
    user.date.shift();
  else{
    user.date.splice(idx,1);
  }
  changeUser(user)
  setRelaod(!reload);
  

}

const cancelAppFromList= (val,idx)=>{
  let date = val;
  let time = date.substring(date.indexOf(' '));
  date = date.substring(0,date.indexOf(' '));
  // user.date.splice(idx,1);
  cancelApp(time,date,idx,false);
 
  
}

const showAll = () =>{
  if(moreDetailsFlag == true)
  {
   return user.date.map((val,idx)=>{
      return <li>{val} <Button className='action-button' onClick={()=>{cancelAppFromList(val,idx)}} variant="danger" size="sm">X</Button></li>
      
        
    })
  }
    else{
      return null;
    }
  
}

const nextApp = ()=>{
    if(user.date.length == 0)
        return 'next date: -'
    else{
        let date = user.date[0];
        let time = date.substring(date.indexOf(' '));
        date = date.substring(0,date.indexOf(' '))
        return <div>
            <p>{date}</p>
            <p>{time}</p>
            <Button onClick={()=>{cancelApp(time,date)}} variant='danger'>cancel date</Button> <br/> <br/>
            <Button onClick={()=>{setMoreDetailsFlag(!moreDetailsFlag)}} variant='primary'>
              {moreDetailsFlag == false? 'show All' : 'show Less'}
              </Button>
            <div>
              <ol className='button-list'>{showAll()}</ol>
              </div>
        </div>
    }
}

  return (
    <div>
         <Card border='info'>
      <Card.Header as="h5">Hello {user.fullName}</Card.Header>
      <Card.Body>
        <Card.Title>Close encounters:</Card.Title>
        {nextApp()}
      </Card.Body>
    </Card>
    </div>
  )
}
