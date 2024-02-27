const signInCheck =(pass)=>{
    return fetch('/signin',{
        headers:{
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            password: pass
        })

    }).then((res)=>{return res.json()}).then((data)=>{
        return data;
    })
}


module.exports = {signInCheck}