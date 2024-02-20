const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const MONGODB = require('./config/db')

const app = express();
dotenv.config();

const port = process.env.PORT || 5200;


const RegistrationSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   }
}, { timestamps: true });

const Registration = mongoose.model("Registration", RegistrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
   res.sendFile(__dirname + "/pages/index.html");
});
app.post('/register', async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const existUser = await Registration.findOne({ email: email });
      if (!existUser) {
         const RegistrationData = new Registration(req.body);
         const savedata = await RegistrationData.save();
         // res.status(200).json({success:true,message:"Registration SuccessFully...",data:savedata});
         res.redirect('/success');
      } else {
         res.redirect('/error');

      }

   } catch (error) {
      // res.status(500).json({success:false,message:"Failed to registration"});
      res.redirect('/error');

   }
});

app.get('/success', (req, res) => {
   res.sendFile(__dirname + "/pages/success.html");
})
app.get('/error', (req, res) => {
   res.sendFile(__dirname + "/pages/error.html");
})


//  db
MONGODB();

app.listen(port, () => {
   console.log(`Server listen On http://localhost:${port}`);
})