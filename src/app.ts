import express, { Application } from "express";
import cors from "cors";
import { v1Router } from "@/routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router);

export default app;
