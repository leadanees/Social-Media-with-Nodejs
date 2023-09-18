const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgen=require('morgan');
const userroute=require('./routes/users');
const authrouter=require('./routes/auth');


const app=express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{UseNewUrlParser:true,useUnifiedTopology:true});

app.use(express.json());
app.use(helmet());
app.use(morgen('common'));

app.use('/api/users',userroute);
app.use('/api/auth',authrouter);

app.listen(8000,()=>{
    console.log("start");
})