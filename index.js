require('dotenv').config()
const express= require('express');
const morgan= require('morgan');//morgan act as a logger
const mongoose = require('mongoose');
const cors= require('cors');

const path = require('path');


const server= express();//indicate start of a server
const productRouter=require('./routes/product')
const userRouter=require('./routes/user')
console.log(process.env.DB_PASSWORD);

//db connection

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected');

}





//middleware
//built in middlewares
server.use(cors());// this middleware hepls connect the servers
server.use(express.json());//will read body of the request also which will only be in json
server.use(morgan('default'))
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));//static hosting from public folder
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})
console.log('env',process.env.DB_PASSWORD)

//@Abhay7199
//abhi0_1pvt  db password


//MVC model-view-controller


//API - Endpoint- route
//Products
//API ROOT,base url, example- google.com/api/v2/




server.listen(process.env.PORT,()=>{//indicate end of a server
    console.log('server started')
});