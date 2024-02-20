const mongoose  = require("mongoose")

 const MONGODB = async() =>{
    try {
        await mongoose.connect(process.env.URL);
        console.log("MongoDB is connected...");
    } catch (error) {
        console.log("MongoDB Connection Failed!!!");
    }
}

module.exports = MONGODB;