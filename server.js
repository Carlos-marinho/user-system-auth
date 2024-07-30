import express from "express";
import publicRoutes from "./routes/public.js"

const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(publicRoutes)

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});

