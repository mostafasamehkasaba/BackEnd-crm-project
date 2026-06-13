import dotenv from "dotenv";
dotenv.config();

import app from "./index.js";
import { DBconnection } from "./src/DB/connectionDB.js";

const port = 8000;

DBconnection();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});