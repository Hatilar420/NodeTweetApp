const e = require('express');
const express =  require('express');
const router = express.Router();
const _UserServices = require('../Services/UserServices')






router.get('/' , async (req,res) =>{
    try{
        let result = await _UserServices.getUsersAsync()
        if(result.IsSuccess){
            res.status(200).send(result.Users)
        }else{
            res.status(500).send(result.Error)
        }        
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
} )

router.post('/register', async(req, res) =>{
    try{
        let result = await _UserServices.AddUserAsync(req)
        if(result.Token != null){
            res.status(201).send(result)
        }else{
            res.status(400).send()
        }
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
} )


router.post('/login', async(req, res) => {
    let result  = await _UserServices.LoginUserAsync(req)
    console.log(result)
    if(result.IsSuccess && result.LoginSuccess){
        res.status(200).send({token : result.Token})
    }
    else if(result.IsSuccess && !result.LoginSuccess){
        res.status(401).send(
            {message : "Username or password is incorrect"}
         )
    }else{
        res.status(500).send(result.Error)
    }
})

module.exports = router
