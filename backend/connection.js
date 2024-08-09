const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mohithchalamala:16461646@cluster0.778x2cg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster')
.then((result)=>{
    console.log("MongoDB Connected")
})
.catch(e=>{
    console.log(e)
})