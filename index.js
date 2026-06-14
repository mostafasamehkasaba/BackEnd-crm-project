import express from "express";
import userRouter from "./src/modules/auth/auth.route.js";
import propertyRouter from "./src/modules/property/property.route.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("test");
});


app.use("/api/auth/",userRouter)

app.use("/api/properites",propertyRouter)


export default app;