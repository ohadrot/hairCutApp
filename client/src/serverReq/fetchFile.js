const getFreeAppointment = async(year,month,day)=>{
    try{
        let allTheAppArr = await fetch(`/getAllTheFreeAppointmentOfDay?year=${year}&month=${month+1}&day=${day+1}`);
        let res = await allTheAppArr.json();
        return res
    }
    catch(e){
        throw e;
    }
}

const savaNewAppInTheDb= (year,month,day,time,id)=>{
    let hour = time.substring(0, time.indexOf(':'))
    let minutes = time.substring(time.indexOf(':')+1)

    console.log(id)
    console.log(hour)
    console.log(minutes)
    fetch('/updateEpoitment',{
        headers: {"Content-Type": "application/json",},
        method: 'put',
        body: JSON.stringify({
            id,
                date:
                {
                    year,
                    month,
                    day,
                    hour,
                    minutes
                }
        })

    }).then((res)=>{return res.json()}).then((date)=>{
        alert('the date is save');
    }).catch((e)=>{throw e})
    
}

const cancelAppointment= (appointment,month,day,year)=>{
    // if(month<10)
    //     month = `0${month}`;
    // if(day <10)
    //     day = `0${day}`

    let fullDate = `${year}-${month}-${day} ${appointment.time}`
    console.log(appointment)
    console.log(fullDate)
    
    fetch('/cancelAppointment',{
        headers: {"Content-Type": "application/json",},
        method: 'put',
        body: JSON.stringify({
               
                    fullDate,
                    id: appointment.userId

                
        })

    }).then((res)=>{return res.json()}).then((date)=>{
        alert('the app is remove');
    }).catch((e)=>{throw e})
    
}

const getAllTheAppointment= (year,month,day)=>{
     // fetch(`/getAllTheAppointmentOfDay?year=${year}&month=${month}&day=${day}`)
     return [
        {
            "name": "yosi vohen",
            "userId": 3,
            "time": "08:00",
            "_id": "65b4f8ded180dc7943775ce4"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "08:30",
            "_id": "65b4f8ded180dc7943775ce5"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "09:00",
            "_id": "65b4f8ded180dc7943775ce6"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "09:30",
            "_id": "65b4f8ded180dc7943775ce7"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "10:00",
            "_id": "65b4f8ded180dc7943775ce8"
        },
        {
            "name": "ohad rot",
            "userId": 1,
            "time": "10:30",
            "_id": "65b4f8ded180dc7943775ce9"
        },
        {
            "name": "ravid plotnik",
            "userId": 4,
            "time": "11:00",
            "_id": "65b4f8ded180dc7943775cea"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "11:30",
            "_id": "65b4f8ded180dc7943775ceb"
        },
        {
            "name": "yosi vohen",
            "userId": 3,
            "time": "12:00",
            "_id": "65b4f8ded180dc7943775cec"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "12:30",
            "_id": "65b4f8ded180dc7943775ced"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "13:00",
            "_id": "65b4f8ded180dc7943775cee"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "13:30",
            "_id": "65b4f8ded180dc7943775cef"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "14:00",
            "_id": "65b4f8ded180dc7943775cf0"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "14:30",
            "_id": "65b4f8ded180dc7943775cf1"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "15:00",
            "_id": "65b4f8ded180dc7943775cf2"
        },
        {
            "name": "ravid plotnik",
            "userId": 4,
            "time": "15:30",
            "_id": "65b4f8ded180dc7943775cf3"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "16:00",
            "_id": "65b4f8ded180dc7943775cf4"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "16:30",
            "_id": "65b4f8ded180dc7943775cf5"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "17:00",
            "_id": "65b4f8ded180dc7943775cf6"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "17:30",
            "_id": "65b4f8ded180dc7943775cf7"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "18:00",
            "_id": "65b4f8ded180dc7943775cf8"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "18:30",
            "_id": "65b4f8ded180dc7943775cf9"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "19:00",
            "_id": "65b4f8ded180dc7943775cfa"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "19:30",
            "_id": "65b4f8ded180dc7943775cfb"
        },
        {
            "name": " ",
            "userId": -1,
            "time": "20:00",
            "_id": "65b4f8ded180dc7943775cfc"
        }
    ]
}



module.exports = {getFreeAppointment,getAllTheAppointment,savaNewAppInTheDb,cancelAppointment}