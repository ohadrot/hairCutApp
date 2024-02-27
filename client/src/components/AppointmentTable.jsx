import React, { useEffect, useState,useContext } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import AllData from '../ScheduleContext';
import { cancelAppointment } from '../serverReq/fetchFile';


export default function AppointmentTable({allAppo}) {

    const halfLength = Math.ceil(allAppo.length / 2);
    const leftSchedule = allAppo.slice(0, halfLength);
    const rightSchedule = allAppo.slice(halfLength);
    const [currectThisTime,setCurrectThisTime] = useState('');
    const [currectThisDay,setCurrectThisDay] = useState('');
    const [currectThisMonth,setCurrectThisMonth] = useState('');
    const {currentMonth,currentDay} = useContext(AllData)



    useEffect(()=>{
        let x= new Date();
        let min = x.getMinutes() < 10? `0${x.getMinutes()}` : x.getMinutes()
        let ti = `${x.getHours()}:${min}`;
        setCurrectThisTime(ti)
        setCurrectThisMonth(x.getMonth())
        setCurrectThisDay(x.getDate())
    })
  
    const cancelApp =(appForCancel)=>{
        cancelAppointment(appForCancel,currentMonth+1,currentDay,2024);
        console.log('finish')
        
    }

    const customTr= (val)=>{
        // if(val.time < currectThisTime || val.name == ' ')
        if( val.name == ' ')
        {
            return (<tr style={{height: '42.639px'}}>
                <td>
                
                </td>
                    <td>
                        {val.time}
                    </td>
                    <td style={{fontFamily: 'cursive'}}>{val.name}</td>
                </tr>)
        }
        else{
            return (<tr  style={{height: '42.639px'}}>
                <td>
                <Button style={{height: '23px',padding: '2px'}} onClick={()=>{cancelApp(val)}} variant="outline-danger">Cancel</Button>
                </td>
            <td>
                {val.time}
            </td>
            <td style={{fontFamily: 'cursive'}}>{val.name}</td>
        </tr>)
        }
    }

    
  return (
    <div style={{display: 'flex'}}>

        <Table striped bordered hover variant="dark" style={{border: 'none'}}>
            <tbody>
            {leftSchedule.map((val)=>{
                {return customTr(val)}
            })}
            </tbody>
        </Table>
        <Table striped bordered hover variant="dark" style={{border: 'none'}}>
            <tbody>
            {rightSchedule.map((val)=>{
                {return customTr(val)}
            })}
            </tbody>
        </Table>
    </div>
  )
}
