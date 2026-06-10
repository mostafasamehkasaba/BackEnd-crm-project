import dotenv from "dotenv";
dotenv.config();

import app from "./server.js";
import { DBconnection } from "./src/DB/connectionDB.js";

const port = 8000;

DBconnection();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});