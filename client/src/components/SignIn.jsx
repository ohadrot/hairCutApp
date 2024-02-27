import React ,{useState,useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form';
import UserData from '../UserContext';
import { signInCheck } from '../serverReq/signInFetch';



export default function SignIn() {

  const [adminChoose,setAdminChoose] = useState(false);
  const [code,setCode] = useState('')
  const {changeUser,setAdmin} = useContext(UserData)
  const nav = useNavigate()


  const validate = async()=>{
    let user = await signInCheck(code);
    console.log(user)
    if(user != null && user.admin == adminChoose)
    {
      changeUser(user);
      setAdmin(adminChoose)
      nav('/board')
    }
    else{
      alert('code dosnt match')
    }
  }

  const admin =(e)=>{
    if(e.target.value == 'Customers')
        setAdminChoose(false)
    else if(e.target.value == 'Admin')
        setAdminChoose(true)
  }
  return (
    <div>
        <h1>wellcome to our App</h1> <br/>
        <p>user: 87036</p>
        <p>admin: 78142</p>
        <h3 style={{marginBottom: '50px'}}>please enter your code:</h3>
        <Form onInput={admin} style={{margin : '50px', display: 'flex', justifyContent: 'center'}}>
        <div style={{marginRight: '50px'}}>
        <Form.Check.Input value='Customers' name='check' type='radio' isValid />
        <Form.Check.Label >{`Customers`}</Form.Check.Label>
        </div>
        <div>
        <Form.Check.Input value='Admin' name='check' type='radio' isValid />
        <Form.Check.Label>{`Admin`}</Form.Check.Label>
        </div>
        </Form>
        <input onInput={(e)=>{setCode(e.target.value)}} type='text'/> <br/>
        <Button style={{marginTop: '10px'}} onClick={validate}>Enter</Button>
    </div>
  )
}
