// function return array of hours (15 min from each other) between two argoments 

function generateHoursArray(minHour, maxHour) {
    const hoursArray = [];
  
    // Ensure valid input
    if (minHour < 0 || maxHour > 24 || minHour >= maxHour) {
      throw new Error('Invalid input. Please provide valid min and max hours.');
    }
  
    // Convert hours to minutes for easier calculation
    const minMinute = minHour * 60;
    const maxMinute = maxHour * 60;
  
    // Generate hours in 15-minute intervals
    for (let minute = minMinute; minute <= maxMinute; minute += 30) {
      const hour = Math.floor(minute / 60);
      const minutePart = minute % 60;
      
      // Format the hour and minute as a string
      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinute = String(minutePart).padStart(2, '0');
  
      const timeString = `${formattedHour}:${formattedMinute}`;
      hoursArray.push(timeString);
    }
  
    return hoursArray;
  }
  
 //this function build all the db of the Schedule between two argoment(from,to)
function buildScheduleDB(firstAppointment , lastAppointment){
    const numbersOfDayInMonth2024 = [31,29,31,30,31,30,31,31,30,31,30,31];
    const namesOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    const hoursOfTheAppointments = generateHoursArray(firstAppointment,lastAppointment);

    let readyArrayOfAppointmentObject = hoursOfTheAppointments.map((hour)=>{
        return {name: ' ', userId: -1, time: hour}
    })    
    let readyArrayOfDays = [];

    numbersOfDayInMonth2024.forEach((numOfDay)=>{
        let tempArr = [];
        for(let i =1 ; i<= numOfDay; i++)
        {
            tempArr.push({day: i,appointments: [...readyArrayOfAppointmentObject]})
        }
        readyArrayOfDays.push([...tempArr]);
        tempArr = [];
    })
    

    let readyArrayOfAllTheMonth = namesOfMonth.map((monthName,idx)=>{
        return {month: monthName,days: [...readyArrayOfDays[idx]]}
    })
    const dbOfAllTheYear = {
        year: 2024,
        months: [...readyArrayOfAllTheMonth]
    }

    return dbOfAllTheYear;
}

const UpdateNewAppointment = (option,userId,year,month,day,hour,minutes,userName)=>{ // option: t - newApo , f - finishApo
    const yearsModel = require('./ScheduleSchema');
    const namesOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    let newTime =  `${hour}:${minutes}`;
    yearsModel.findOne({year: year})
    .then((foundYear)=>{
      if(!foundYear)
       throw new Error('year not found')
       
       const monthForChange =  foundYear.months.find((m)=>{return m.month == namesOfMonth[month-1]})
       if (!monthForChange) {
        throw new Error('Month not found');
      }
       console.log(monthForChange)
       const dayForChange = monthForChange.days.find((d)=>{return d.day == day});
       if (!dayForChange) {
        throw new Error('Day not found');
      }
       const appointmentForChange = dayForChange.appointments.find((appointment)=>{return appointment.time == newTime});
       if (!appointmentForChange) {
        throw new Error('Appointment not found');
      }
      if(option == true)
      {
       appointmentForChange.userId = userId;
       appointmentForChange.name = userName;
      }
      else{
        appointmentForChange.userId = -1;
       appointmentForChange.name = ' '
      }
       return foundYear.save();
      })
      .then(() => {
        console.log('Appointment updated successfully');
      })
  }

  // all the free appointment of the day
  const getTheFreeScheduleOfDay = (year,month,day)=>{
    const namesOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    const yearsModel = require('./ScheduleSchema');
   return yearsModel.findOne({year: year})
    .then((foundYear)=>{
      if(!foundYear)
       throw new Error('year not found')
       
       const monthForChange =  foundYear.months.find((m)=>{return m.month == namesOfMonth[month-1]})
       if (!monthForChange) {
        throw new Error('Month not found');
      }
       const dayForChange = monthForChange.days.find((d)=>{return d.day == day});
       if (!dayForChange) {
        throw new Error('Day not found');
      }
      let result = [];
        dayForChange.appointments.forEach((val)=>{if(val.userId == -1)result.push(val.time)})
        return result;
      })
  }

  const getTheFullScheduleOfDay = (year,month,day)=>{
    const namesOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    const yearsModel = require('./ScheduleSchema');
   return yearsModel.findOne({year: year})
    .then((foundYear)=>{
      if(!foundYear)
       throw new Error('year not found')
       
       const monthForChange =  foundYear.months.find((m)=>{return m.month == namesOfMonth[month-1]})
       if (!monthForChange) {
        throw new Error('Month not found');
      }
       const dayForChange = monthForChange.days.find((d)=>{return d.day == day});
       if (!dayForChange) {
        throw new Error('Day not found');
      }
      
        return dayForChange;
      })
  }


  



module.exports = {buildScheduleDB,UpdateNewAppointment,getTheFreeScheduleOfDay,getTheFullScheduleOfDay};



