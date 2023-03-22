import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Router from "./router/product"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", Router)

mongoose.connect("mongodb://127.0.0.1:27017/assignment")

export const viteNodeApp = app;