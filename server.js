const express = require('express');
const app = express();
const db = require('mongoose');
const bp = require('body-parser');
const Joi = require('joi');


db.connect('mongodb+srv://ohadnew:12345@cluster0.gbavwhk.mongodb.net/hairCatData');

app.use(bp.json());
app.use(express.static('client/build'))

const userSchema = db.Schema({
    _id : Number,
    phoneNumber: String,
    fullName: String,
    password: String,
    date: [String],
    history: Array,
    admin: Boolean
    
})

const yearsModel = require('./ScheduleSchema');
const userModel = db.model('users',userSchema);


////////////////////////////
// build schedule db (play just one time):
// const {buildScheduleDB} = require('./functionForDbBuild');


  
//   const fullJson = buildScheduleDB(8,20);
//   yearsModel.insertMany(fullJson);

///////////////////


  

app.get('/users',async(req,res)=>{
    try{
        let result = await userModel.find();
        res.status(200).json(result)
    }
    catch(e){
        res.status(400).json(e);
    }
})

app.get('/users/:id',async(req,res)=>{
    let userId = req.params.id;
    try{
        let result = await userModel.findOne({_id: userId});
        if(result)
            res.status(200).json(result)
        else{
            res.status(404).json({"error" :`user num ${userId} dosnt axist`})
        }
    }
    catch(e){
        res.status(400).sand(e);
    }
})

app.post('/addnewuser',async(req,res)=>{
    const {getNewPassword} = require('./functionForServer')
    let len = await userModel.find();
    len = len.length;
    let pass = getNewPassword();
    let temp = {
        _id: ++len,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        password: pass,
        admin: false
    }
    try{
        await userModel.insertMany(temp)
        res.status(200).json(temp);
    }
    catch(e){
        res.status(400).json(e);
    }
})

app.post('/signin',async(req,res)=>{
    try{
    let signInUser = await userModel.findOne({password: req.body.password})
    res.status(200).json(signInUser);
    }
    catch(e){
        res.status(400).sand(e)
    }
})

app.get('/getallyear',async(req,res)=>{
  try{
    let allYear = await yearsModel.find();
    res.status(200).json(allYear);
  }
  catch(e){
    res.status(400).sand(e);
  }
})

app.put('/updateEpoitment',async(req,res)=>{
  const {UpdateNewAppointment} = require('./functionForDbBuild')
    let {year,month,day} = req.body.date;
    let {hour,minutes} = req.body.date;
    month++;
    let date = `${year}-${month}-${day}`
    let time = `${hour}:${minutes}`
    let userId = req.body.id;
    try{
        let result= await userModel.findOne({_id: userId});
        result.date.push(date+' ' +time);
        result.date.sort((a,b)=>{const dateA = new Date(a); const dateB = new Date(b); return dateA - dateB;})
        UpdateNewAppointment(true,userId,year,month,day,hour,minutes,result.fullName);
        res.status(200).json(result);
        return result.save();
    }
    catch(e){
        res.status(400).json(e);
    }
})

app.put('/finishAppointment',async(req,res)=>{
  const {UpdateNewAppointment} = require('./functionForDbBuild');
  const {splitDateStringFor5Ver} = require('./functionForServer')
    let userId = req.body.id;
    let {date,history} = await userModel.findById(userId);
    let firstDate = date[0];
    history.push(firstDate);
    date.shift();
    let allAppointmentDetails= splitDateStringFor5Ver(firstDate);
    try{
        let result= await userModel.findByIdAndUpdate(userId,{date: date,history: history})
        UpdateNewAppointment(false,userId,allAppointmentDetails[0],allAppointmentDetails[1],
          allAppointmentDetails[2],allAppointmentDetails[3],allAppointmentDetails[4])
        res.status(200).json(result);
    }
    catch(e){
        res.status(400).json(e);
    }

})

app.put('/cancelAppointment',async(req,res)=>{
    console.log('server:')
    const {UpdateNewAppointment} = require('./functionForDbBuild');
    const {splitDateStringFor5Ver} = require('./functionForServer')
      let userId = req.body.id;
      let dateForCancel = req.body.fullDate;
      console.log(dateForCancel)
      let {date} = await userModel.findById(userId);
      console.log('here:')
      console.log(date)
      let indexForCancel = date.findIndex((val)=>{return val == dateForCancel })
      console.log('index:' + indexForCancel)
      let allAppointmentDetails= splitDateStringFor5Ver(date[indexForCancel]);
      date.splice(indexForCancel,1)
      try{
          let result= await userModel.findByIdAndUpdate(userId,{date: date})
          UpdateNewAppointment(false,userId,allAppointmentDetails[0],allAppointmentDetails[1],
            allAppointmentDetails[2],allAppointmentDetails[3],allAppointmentDetails[4])
          res.status(200).json(result);
      }
      catch(e){
          res.status(400).json(e);
      }
  
  })

app.get('/getAllTheFreeAppointmentOfDay',async(req,res)=>{
    const {getTheFreeScheduleOfDay} = require('./functionForDbBuild')
    const {year,month,day} = req.query;
    console.log('month: ' + month)
    console.log('day: ' + day)
    let allTheFreeApoointment = await getTheFreeScheduleOfDay(year,month,day);
    res.json(allTheFreeApoointment)
})

app.get('/getAllTheAppointmentOfDay',async(req,res)=>{
    const {getTheFullScheduleOfDay} = require('./functionForDbBuild');
    const {year,month,day} = req.query;
    let allApoointment = await getTheFullScheduleOfDay(year,month,day)
    res.json(allApoointment.appointments)
})







const PORT  = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`server is on: ${PORT} `)})