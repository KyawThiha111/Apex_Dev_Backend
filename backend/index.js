const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

/* Route */
const QuizGenerateRouter = require("./Routes/QuizGenerator.js")
const AuthRouter = require("./Routes/AUTH/auth.js")
const CSProgressRouter = require("./Routes/ComputerScience/progress.js")
const app = express();
app.use(cors({
  origin: 'http://localhost:8080', // React app URL or any allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  credentials: true, // if you need to send cookies/auth headers
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/",(req,res)=>{
    res.send("<div><p>/api/chat (for quizes )</p></div>")
})

app.use("/api",QuizGenerateRouter);
app.use("/auth",AuthRouter)
app.use("/api",CSProgressRouter)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT||3000, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));


