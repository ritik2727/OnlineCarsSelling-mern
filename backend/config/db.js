import mongoose from "mongoose";


const ConnectDB = async () =>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true

       });
       console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default ConnectDB;