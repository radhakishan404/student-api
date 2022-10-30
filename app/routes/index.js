import express from "express";

const app = express();

import studentRoutes from "../features/student/student.route.js";

app.use("/student", studentRoutes);

export default app;