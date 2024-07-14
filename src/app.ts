import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

app.use(express.json());

app.use(cors());

//Routes

app.use("/api/", router);

//Global middleware
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
