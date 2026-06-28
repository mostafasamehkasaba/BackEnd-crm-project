import dotenv from "dotenv";
dotenv.config();

import httpServer from "./index.js";
import { DBconnection } from "./src/DB/connectionDB.js";

const port = 8000;

DBconnection();

httpServer.listen(port, () => {
  console.log(`server is running on port ${port}`);
});