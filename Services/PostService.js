const _PostDomain = require('../Domain/PostDomain')
const _JwtService = require('../Services/TokenService')

class PostService {
    CreatePostFromRequest = async(req) =>{
        try{
            let author_id = _JwtService.VerifyTokenAndGetId(req)
            req.body.authorId = parseInt(author_id._id)            
            let result = await _PostDomain.CreateEntity(req.body)
            if(result.IsSuccess){
                return {IsSuccess : true , Post : result.Result}
            }else{
                return {IsSuccess : false , Error : result.Error}
            }
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false , Error : exception}
        }
    }

    getUserPostsFromRequest = async(req) => {
        let author_id = _JwtService.VerifyTokenAndGetId(req)
        let res = await this.getUserPosts(parseInt(author_id._id))
        return res
    }

    getUserPosts = async (Author_id) =>{
        let query = {
            authorId : Author_id
        }
        let result = await _PostDomain.GetEntityByPrismQuery(query)
        if(result.IsSuccess){
            return result.Result
        }else{
            return null
        }
    }
}

module.exports = new PostService()