import express from "express"
const app=express()




app.get("/")



app.listen(3000,()=>{
    console.log("Server listening on port 3000")
})