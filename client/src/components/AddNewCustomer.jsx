import React, { useContext, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UserData from '../UserContext';
import { addNewUser } from '../serverReq/newUserFetch';
import './addNewCustomer.css'

export default function AddNewCustomer() {

    const [fullName,setFullName] = useState('')
    const [phone,setPhone] = useState({})
    const {user} = useContext(UserData)
    const [newPassword,setNewPassword] = useState('')


    const getPassword = async ()=>{
       const newPass = await addNewUser(fullName,phone);
       setNewPassword(newPass);

    }
  return (
    <div>
        <Card border='info'>
      <Card.Header as="h5">Hello {user.fullName}</Card.Header>
      <Card.Body>
        <Card.Title>New Customer:</Card.Title>
        <input onChange={(e)=>{setFullName(e.target.value)}} type='text' placeholder='enter full name'/>
        <PhoneInput onlyCountries={['us','il']} onChange={(e)=>{{setPhone(e)}}} country={'isreal'}/>
        <Button onClick={getPassword} variant="success">get password</Button>
        <div className='passwordBox'>
            <p>{newPassword}</p>
        </div>
      </Card.Body>
    </Card>
    </div>
  )
}
