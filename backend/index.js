const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//  const connectToMongo = require('./db');

//  connectToMongo;
mongoose.connect("mongodb://localhost:27017/inotebookDB",{useNewUrlParser:true});

 const app = express();



app.use(express.json()) //to use req.body
app.use(cors())
 // available routes
 app.use('/api/auth', require('./routes/auth'))
   app.use('/api/notes', require('./routes/notes'))



app.listen(5000, ()=>{
    console.log("Server is starting at port 5000");
})

