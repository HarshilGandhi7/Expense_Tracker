const dbConnect=require("./database/database");
const express=require("express");
const cors=require("cors");
const {readdirSync}=require("fs");
const app=express();

require("dotenv").config();
const PORT=process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes
//dynamically allocated the routes throught readdirSync runs all the files and make routes accordingly
readdirSync("./routes").map((route)=>app.use("/ap1/v1",require("./routes/"+route)))



app.get('/', (req, res) => {
    res.send("Hello World");
});

const server=async()=>{
    await dbConnect(); //connect to mongodb database
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}

server();