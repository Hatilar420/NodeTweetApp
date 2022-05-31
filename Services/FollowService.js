const _FollowDomain = require('../Domain/FollowerDomain')
const _PostService = require('./PostService')
const _JwtService = require('../Services/TokenService')

class FollowService {

    CreateFollowFromRequest  = async(req,following_Id) =>{
        try{
            let author_id = _JwtService.VerifyTokenAndGetId(req)
            let follower_id = parseInt(author_id._id)
            if(follower_id == following_Id){
                return {IsSuccess : false}
            }
            let Following = await _FollowDomain.GetEntityByPrismQuery({followingId : following_Id,followerId : follower_id })
            if(Following.Result.length != 0){
                return {IsSuccess : false}
            }
            let result = await _FollowDomain.CreateEntity({followerId : follower_id ,followingId : following_Id })
            if(result.IsSuccess){
                return {IsSuccess : true}
            }else{
                return {IsSuccess : false}
            }
        }catch(exception){
            console.log(exception)
            return{IsSuccess : false}
        }
    }


    DeleteFollowFromRequest  = async(req,following_Id) =>{
        try{
            let author_id = _JwtService.VerifyTokenAndGetId(req)
            let follower_id = parseInt(author_id._id)
            let temp = await _FollowDomain.GetEntityByPrismQuery({ followerId : follower_id , followingId : following_Id  })
            if(!temp.IsSuccess || (temp.Result.length == 0)){
                return {IsSuccess : false , Error : temp.Error}
            }
            for(let i of temp.Result){
                await _FollowDomain.DeleteEntityById(i.id)
            }
            return {IsSuccess : true}
        }catch(exception){
            console.log(exception)
            return{IsSuccess : false}
        }
    }

    _getFollowingIds = async(Follower_id) => {
        try{
            let Following = await _FollowDomain.GetEntityByPrismQuery({followerId : Follower_id})
            let Following_Ids  = []
            for(let i of Following.Result){
                Following_Ids.push( i.followingId )
            }
            return Following_Ids
        }catch(exception){
            console.log(exception)
            return null
        }
    }

    getFollowingPostsFromRequest = async (req) =>{
        let author_id = _JwtService.VerifyTokenAndGetId(req)
        let follower_id = parseInt(author_id._id)
        let Following_Ids = await this._getFollowingIds(follower_id)
        let posts = []
        for(let i of Following_Ids){
            let temp = await _PostService.getUserPosts(i)
            posts = posts.concat(temp)
        }
        posts.sort( (x,y) => {
            return y.createdAt - x.createdAt
        } )
        return posts
    }
}

module.exports = new FollowService()