class CommonDomain {

    constructor(PrismaClient){
        this._dbContext =  PrismaClient
    }

    CreateEntity = async (Data) =>{
        try{
            let result = await this._dbContext.create({
                data:Data
            })
            console.log(result)
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }


    UpdateEntity = async ( Id ,field, changed_data) =>{
        let changed_field = {}
        changed_field[field] = changed_data
        try{
            console.log(changed_field)
            let result = await this._dbContext.update({
                where : { id : Id},
                data : changed_field
            })
            console.log(result)
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }


    DeleteEntityById = async ( Id ) =>{
        try{
            let result = await this._dbContext.delete({
                where : {
                    id : Id
                }
            })
            console.log(result)
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }


    GetEntityById = async ( Id ) =>{
        try{
            let result = await this._dbContext.findFirst({
                where : {
                    id : Id
                }
            })
            console.log(result)
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }


    GetAllEntity = async (  ) =>{
        try{
            let result = await this._dbContext.findMany()
            console.log(result)
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }

    GetEntityByPrismQuery = async (query) =>{
        try{
            let result = await this._dbContext.findMany({
                where : query
            })
            return {IsSuccess : true, Result : result}
        }catch(exception){
            console.log(exception)
            return {IsSuccess : false, Error : exception}
        }
    }

}

module.exports = CommonDomain