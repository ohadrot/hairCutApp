const addNewUser =(fullName,phoneNumber)=>{
    return fetch('/addnewuser',{
        headers:{
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            fullName,
            phoneNumber,
        })

    }).then((res)=>{return res.json()}).then((data)=>{
        return data.password;
    })
}

module.exports = {addNewUser}


