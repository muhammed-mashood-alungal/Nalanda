import express, { Application } from "express";
import cors from "cors";
import { v1Router } from "@/routes";
import { errorHandler, routeNotFound } from "@/middleware";
import cookieParser from "cookie-parser";

const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router);

app.use(errorHandler);
app.use(routeNotFound);

export default app;
