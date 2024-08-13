import express from "express";
import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import jwtMiddleware from "./middlewares/auth.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(publicRoutes)
app.use(jwtMiddleware, privateRoutes)

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});

