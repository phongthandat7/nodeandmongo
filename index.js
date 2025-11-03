const express = require('express')
const logger = require('morgan')
const app = express()
const usersRoute = require('./routes/user')//import
const mongoClient = require('mongoose')
const bodyParser = require('body-parser')


mongoClient.connect('mongodb://localhost:27017')
    .then(()=>{console.log('thanh cong')})
    .catch(()=>{console.error(`that bai`)})




//midlewares
app.use(logger('dev'))// bien moi truong
app.use(bodyParser.json())
//Route

app.use('/users', usersRoute)



app.get('/', (req, res, next) =>{
    return res.status(200).json({
        message: 'server is okela'
    })
})
//catch
app.use((res, req, next)=> {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// handle
app.use(()=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    //response
    return res.status(status).json({
        error:{
            message: error.message//bat loi trong catch
        }
    });


})

const port = app.get('port') || 3000
app.listen(port, ()=> console.log(`Server is listening on port ${port}`))