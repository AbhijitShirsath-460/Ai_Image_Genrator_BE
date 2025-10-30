import mongoose from "mongoose";


const connectToMongodb = async()=>{


    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{
            console.log("Connected to MongoDB")
        })
        .catch((err)=>{
            console.log("Error connecting to MongoDB")
            console.log(err)
        })
        
    } catch (error) {
        console.log("database error" , error);
        
        
    }
}

export default connectToMongodb