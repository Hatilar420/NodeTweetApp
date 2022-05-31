const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');


class UserDomain {
    
    constructor(){
        this.prisma = new PrismaClient()
    }

    CreateUser = async (user_domain) =>{
        user_domain.password = await bcrypt.hash(user_domain.password, 8)
        try{
            let result = await this.prisma.user.create({
                data:{
                    username : user_domain.username,
                    password : user_domain.password,
                    email : user_domain.email,
                }
            })
            return {IsSuccess : true, User : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }


    UpdateUser = async ( userId ,field, changed_data) =>{
        if(field == "password"){
            changed_data = await bcrypt.hash(changed_data, 8)
        }
        let changed_field = {}
        changed_field[field] = changed_data
        try{
            console.log(changed_field)
            let result = this.prisma.user.update({
                where : { id : userId},
                data : changed_field
            })
            return {IsSuccess : true, Updated_User : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }

    DeleteUser = async  ( userId ) =>{
        try{
            let result = await this.prisma.user.delete({
                where : {
                    id : userId
                }
            })
            return {IsSuccess : true, Deleted_User : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }

    GetUsers = async () =>{
        try{
            let result = await this.prisma.user.findMany({
                select  : {
                    id : true,
                    username : true,
                    email : true
                }
            })
            return {IsSuccess : true, Users : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }

    GetUserById = async ( userId ) =>{
        try{
            let result = await this.prisma.user.findFirst({
                where : {
                    id : userId
                }
            })
            return {IsSuccess : true, User : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }


    GetUserByName = async ( Name ) =>{
        try{
            let result = await this.prisma.user.findFirst({
                where :{
                    username : Name
                }
            })
            return {IsSuccess : true, User : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }

}


module.exports = new UserDomain()