const express =  require('express');
const router = express.Router();
const _FollowerService = require('../Services/FollowService')
const AuthMiddleware = require('../Middlware/AuthMiddleware')

router.use(AuthMiddleware)

router.post('/:id' , async (req,res) =>{
    try{
        let result = await _FollowerService.CreateFollowFromRequest(req,parseInt(req.params.id))
        if(result.IsSuccess){
            res.status(200).send()
        }else{
            res.status(400).send()
        }
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
})

router.post('/un/:id' , async(req,res) =>{
    try{
        let result = await _FollowerService.DeleteFollowFromRequest(req,parseInt(req.params.id))
        if(result.IsSuccess){
            res.status(200).send()
        }else{
            res.status(400).send()
        }
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
})

router.get('/posts/', async(req,res) =>{
    try{
        let result = await _FollowerService.getFollowingPostsFromRequest(req)
        res.status(200).send(result)
    }catch(exception){
        console.log(exception)
        res.status(500).send(exception)
    }
})




module.exports = router

