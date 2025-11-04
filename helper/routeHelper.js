const Joi = require("joi");
const validateParam = (schema, name) =>{
    return (req, res, next) => {
        console.log('params', req.params[name])
        const validationResult = schema.validate({param: req.params[name]})
        console.log('validationResult', validationResult)
        if(validationResult.error){
            return res.status(400).json(validationResult.error)
        }
        else{
            console.log('1', req.value)
            if(!req.value) req.value = {}
            console.log('2', req.value.params)
            if(!req.value['params']) req.value.params = {}
            console.log('3', req.value)
            req.value.params[name] = validationResult.value.param
            console.log('req value', req.value)
            next()
        }
    }
}

const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
}


module.exports = {
    validateParam,
    schemas
}