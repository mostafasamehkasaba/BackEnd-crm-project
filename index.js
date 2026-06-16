import express from "express";
import userRouter from "./src/modules/auth/auth.route.js";
import propertyRouter from "./src/modules/property/property.route.js";
import clientRouter from "./src/modules/users/user.route.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("test");
});

app.use("/api/auth/", userRouter);

app.use("/api/properites", propertyRouter);
app.use("/api/clients", clientRouter);

export default app;
