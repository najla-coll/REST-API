const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.DB_PORT || 3000 

app.use(express.json());
/////////////////////
app.get('/',(req,res)=>{
    res.send('HELLO')
})
///////////////////Connect  database

const connectDB = require('./connection');
connectDB();

////////////////////////export the model 

const userModel = require('./models/User');


var user = new userModel({
    name:"Ons",
    age:15,
    professsion:"teacher",
    hobbies:["Sport","Music"]
  
});


const arrayOfUser =[{name:"ons", age:25, profession:"teacher", hobbies:["Sport","Music"]},
{name:"yesser", age:28, profession:"doctor", hobbies:["Sport","Music"]},
{name:"feten", age:30, profession:"lawyer", hobbies:["Sport","Music"]}];



   userModel.insertMany(arrayOfUser)
    .then(function (docs) {
        console.log(docs)
    })
    .catch(function (err) {
        console.log(err);
    });
////////////////////:GET
    
app.get('/all',async(req,res)=>{
       try {
          const user = await userModel.find();
           res.status(200).send({user})
       } catch (error) {
           console.log(error);
           res.status(500).send({error})
       }
})

/////////////////////////POST
app.post('/adduser',async(req,res)=>{

    try {
        const {name,age,profession,hobbies}=req.body;
        const newuser = new userModel(req.body);
        await newuser.save()
        res.status(200).send({newuser})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }

})
//////////////////////PUT
app.put('/update/:id',async(req,res)=>{
     try {
         const userup = await userModel.findOneAndUpdate({_id:req.params.id},{$set:{...req.body}});
         res.status(200).send({userup})
     } catch (error) {
         console.log(error);
         res.status(500).send({error})
     }



})
/////////////////////////////DELETE
app.delete('/delete/:id',async(req,res)=>{
    try {
        const userup = await userModel.findOneAndRemove({_id:req.params.id});
        res.status(200).send({userup})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }



})
///////////////////


user.save()
 .then(doc => {
   console.log(doc)
 })
 .catch(err => {
   console.error(err)
 })                   


/////////////////////////////////////
app.listen(port,()=>{
    console.log('exemple is running')
})
/////////////////////////////

