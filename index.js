"use strict";

import connectDB from "./app/config/database.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

// Internal Dependencies
import { responseSend } from "./app/helpers/responseSend.js";

// All routes
import allRoutes from "./app/routes/index.js";

const port = process.env.PORT || 4000;

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/abc", (req, res) => res.send("abc"));
app.use("/", allRoutes);

// After Processing
app.use((error, req, res, next) => {
    if (!error) {
        return next();
    }
    responseSend(res, 406, error.message);
});

// Server Connection
const server = app.listen(port, () => {
    console.log("== Server running on Port ==", port);
});