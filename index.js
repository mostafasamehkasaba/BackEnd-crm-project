import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("test");
});
app.use("{/*dummy}", (req, res) => {
  res.status(404).json({ message: "invalid application routing" });
});
export default app;
