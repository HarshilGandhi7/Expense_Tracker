const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=async()=>{
    try{ 
        mongoose.set("strictQuery",false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully");
    }catch(err){
        console.log(err);
        console.log("Error in Connecting the Database");
    }
}

module.exports=dbConnect;