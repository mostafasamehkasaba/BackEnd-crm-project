import dotenv from "dotenv"
dotenv.config()
import express from "express";
import userRouter from "./src/modules/auth/auth.route.js";
import propertyRouter from "./src/modules/property/property.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))  
app.get("/", (req, res) => {
  res.send("test");
});


app.use("/api/auth/",userRouter)

app.use("/api/properties", propertyRouter)  


export default app;