function getNewPassword(){
    let pass = '';
    for(let i = 0; i<5; i++)
    {
        pass += Math.floor(Math.random()*10);
    }
    return pass;
}

function splitDateStringFor5Ver(dateStr){
    let splitDate =[];
    let temp = '';
    for(let i = 0; i< dateStr.length; i++)
    {
      if(dateStr[i] == '-' || dateStr[i] == ' ' ||dateStr[i] == ':')
      {
        splitDate.push(temp);
        temp = '';
        continue;
      }
       temp += dateStr[i];
    }
    splitDate.push(temp);
    return splitDate;
   }

module.exports ={
    getNewPassword,
    splitDateStringFor5Ver
}

// function return array of hours (15 min from each other) between two argoments 

// function generateHoursArray(minHour, maxHour) {
//     const hoursArray = [];
  
//     // Ensure valid input
//     if (minHour < 0 || maxHour > 24 || minHour >= maxHour) {
//       throw new Error('Invalid input. Please provide valid min and max hours.');
//     }
  
//     // Convert hours to minutes for easier calculation
//     const minMinute = minHour * 60;
//     const maxMinute = maxHour * 60;
  
//     // Generate hours in 15-minute intervals
//     for (let minute = minMinute; minute <= maxMinute; minute += 15) {
//       const hour = Math.floor(minute / 60);
//       const minutePart = minute % 60;
      
//       // Format the hour and minute as a string
//       const formattedHour = String(hour).padStart(2, '0');
//       const formattedMinute = String(minutePart).padStart(2, '0');
  
//       const timeString = `${formattedHour}:${formattedMinute}`;
//       hoursArray.push(timeString);
//     }
  
//     return hoursArray;
//   }

//  //this function build all the db of the Schedule between two argoment(from,to)
// function buildScheduleDB(firstAppointment , lastAppointment){
//     const numbersOfDayInMonth2024 = [31,29,31,30,31,30,31,31,30,31,30,31];
//     const namesOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
//     const hoursOfTheAppointments = generateHoursArray(firstAppointment,lastAppointment);

//     let readyArrayOfAppointmentObject = hoursOfTheAppointments.map((hour)=>{
//         return {name: ' ', userId: -1, time: hour}
//     })    
//     let readyArrayOfDays = [];
//     for(let i =1; i<8; i++)
//     {
//         readyArrayOfDays.push({day: i,appointments: [...readyArrayOfAppointmentObject] })
//     }

//     let readyArrayOfAllTheMonth = namesOfMonth.map((monthName)=>{
//         return {month: monthName,days: [...readyArrayOfDays]}
//     })
//     const dbOfAllTheYear = {
//         year: 2024,
//         months: [...readyArrayOfAllTheMonth]
//     }

//     return dbOfAllTheYear;
// }
