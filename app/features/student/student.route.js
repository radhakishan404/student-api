import express from "express";
import reqValidator from "../../middlewares/req.validator.js";

import { studentAddV, studentUpdateV, studentListV, studentGetV } from "./student.validator.js";
import { addStudent, editStudent, listStudent, getStudent, deleteStudent } from "./student.controller.js";

const router = express.Router();

router.post(
    "/create",
    reqValidator(studentAddV),
    (req, res, next) => {
        addStudent(req, res, next);
    }
)

router.put(
    "/update",
    reqValidator(studentUpdateV),
    (req, res, next) => {
        editStudent(req, res, next);
    }
)

router.delete(
    "/delete",
    reqValidator(studentGetV),
    (req, res, next) => {
        deleteStudent(req, res, next);
    }
)

router.get(
    "/list",
    reqValidator(studentListV),
    (req, res, next) => {
        listStudent(req, res, next);
    }
)

router.get(
    "/get",
    reqValidator(studentGetV),
    (req, res, next) => {
        getStudent(req, res, next);
    }
)


export default router;