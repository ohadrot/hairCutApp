
import { useEffect,useContext } from 'react';
import './App.css';
import { AllYearProvider } from './ScheduleContext';
import Board from './components/Board';
import { UserProvider } from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Title from './components/Title';
import SignIn from './components/SignIn.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import DaySchedule from './components/DaySchedule';

function App() {



  return (
    <Card bg='Light '>
      <BrowserRouter>
        <Card.Header>

          <Title/>
        </Card.Header>
       
            <Card.Body>
          <div className="App">
            <UserProvider>
            <AllYearProvider>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/board' element={<Board/>}/> 
          <Route path='/daySchedule' element={<DaySchedule/>}/> 
        </Routes>
            </AllYearProvider>
            </UserProvider>
          </div>
          </Card.Body>
      
    </BrowserRouter>
    </Card>
  );
}

export default App;
