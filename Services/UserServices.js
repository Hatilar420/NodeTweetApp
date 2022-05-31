const _JwtService = require('./TokenService')
const bcrypt = require('bcrypt');
const _UserContext = require('../Domain/UserDomain');
const TokenService = require('./TokenService');
const { parse } = require('dotenv');

class UserService {

    AddUserAsync = async(req) =>{
        try{
            let result = await _UserContext.CreateUser(req.body);
            let token  = await _JwtService.SignToken(result.User.id);
            console.log(result.User)
            let res_obj  = {
                Username : result.User.username,
                Email : result.User.email
            }
            return {Token : token, res_obj}
        }catch(exception){
            console.log(exception)
            return {Token : null}
        }
    }

    getUsersAsync = async() =>{
        try{
            let result = await _UserContext.GetUsers()
            return result
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false}
        }
    }

    LoginUserAsync = async(req) =>{
        let userName = req.body.username
        let Password = req.body.password
        try{
            const result = await _UserContext.GetUserByName(userName)
            if(result.IsSuccess)
            {
                const PasswordAuthResponse = await bcrypt.compare(Password, result.User.password)
                if(PasswordAuthResponse){
                    // console.log("here")
                    let token  = await _JwtService.SignToken(result.User.id);
                    return {
                        IsSuccess : true,
                        LoginSuccess:true, 
                        Token : token
                    }
                }
                else{
                    return {
                        IsSuccess : true,
                        LoginSuccess:false, 
                        Token : null,
                    }
                }
            }
            else{
                return{
                    IsSuccess : false, 
                    LoginSuccess : false,
                    Error : result.Error
                }
            }   
        }
        catch(err){
            console.log(err)
            return{
                IsSuccess: false,
                Error : err,
            }
        }
    }

    VerifyTokenAndGetUserFromToken = async (jwt) =>{
        var result = _JwtService.VerifyTokenAndGetIdFromJwt(jwt)
        if(result.IsSuccess){
            try {
              let user = await _UserContext.GetUserById(result._id)
              if(user.IsSuccess){
                return {IsSuccess : true , User  : user.User}   
              }else{
                return {IsSuccess : false , Error : user.Error}
              }             
            } catch (error) {
                console.log(error)
            }         
       }
       return result 
    }

    VerifyTokenAndGetUser = async(req) => {
        let result = TokenService.VerifyTokenAndGetId(req)
        if(result.IsSuccess){
            let userResult = await _UserContext.GetUserById(parseInt(result._id))
            return userResult
        }else{
            return {IsSuccess : false,Error:result.error}
        }

    }

}


module.exports = new UserService()