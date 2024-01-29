const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const body_parser = require("body-parser")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("mongoose is connected");
}).catch((err)=>err)

app.use(body_parser.urlencoded({extended:false}))
const taskschema = new mongoose.Schema({
    task:String,
    done:{
        
        type:Boolean,
         default:false
    },
})

const taskcollection = new mongoose.model("task", taskschema)

app.post("/api/task/add", async (req,res)=>{
    const task = req.body.task;
    await taskcollection.create({task:task})


    res.status(201).json({
        success:true,
           task
    })
})

app.get("/api/task/get", async (req,res)=>{
    
    await taskcollection.find()
    .then(result=> res.json(result))
    .catch(err=>res.json(err))



})


app.put("/api/task/update/:id", (req,res)=>{
    let {id} = req.params;
    console.log(id);
    taskcollection.findByIdAndUpdate({_id:id},{done:true})
    .then(result=> res.json(result))
    .catch(err=>res.json(err))


})
app.delete("/api/task/delete/:id", (req,res)=>{
    let {id} = req.params;
    taskcollection.findByIdAndDelete({_id:id})
    .then(result=> res.json(result))
    .catch(err=>res.json(err))
})
app.listen(1515,()=>{
    console.log("server is running at http://localhost:1515");
})