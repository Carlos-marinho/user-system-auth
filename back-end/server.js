import express from "express";
import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import jwtMiddleware from "./middlewares/auth.js";
import cors from "cors";

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors())

app.use(publicRoutes)
app.use(jwtMiddleware, privateRoutes)

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});

