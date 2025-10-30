import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv'
import router from './routes/routes.js'
import connectToMongodb from './db/connectToMongodb.js';
import fileUpload from "express-fileupload";


dotenv.config();
const port = 6060 || process.env.PORT
const app = express();

app.use(cors());
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({extended : true}));

//routes/api endpoint
app.use('/api' , router )

//err handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status : status,
      message: message
    });
  });


  app.listen(port , ()=>{
     connectToMongodb()
    console.log("server running on port 6060");
    
  })