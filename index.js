require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')


const docServer = express()

docServer.use(cors())
docServer.use(express.json())
docServer.use(router)
docServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

docServer.listen(PORT,()=>{
    console.log(`docBooking server started at : ${PORT} and waiting for client request!!! `);
    
})

docServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">docBooking server started  for client request!!!</h1>`)
})



