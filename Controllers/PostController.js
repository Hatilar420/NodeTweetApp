const express =  require('express');
const router = express.Router();
const AuthMiddleware = require('../Middlware/AuthMiddleware')
const PostService = require('../Services/PostService');
const PostDomain = require('../Domain/PostDomain')


router.use(AuthMiddleware)

router.post('/', async (req,res) =>{
    let result = await PostService.CreatePostFromRequest(req)
    if(result.IsSuccess){
        res.status(201).send(result.Post)
    }
    else{
        res.status(400).send("A field is missing please check")
    }
})

router.get('/',async (req,res) =>{
    let result = await PostService.getUserPostsFromRequest(req)
    if(result){
        res.status(200).send(result)
    }else{
        res.status(400).send()
    }
})

router.get('/:id' , async (req,res) =>{
    let result = await PostDomain.GetEntityById(parseInt(req.params.id))
    if(result.IsSuccess){
        if(result.Result){
            res.status(200).send(result.Result)
        }else{
            res.status(404).send(result.Result)
        }
       
    }else{
        res.status(500).send(result.Error)
    }
})


module.exports = router