import { responseSend } from "../../helpers/responseSend.js";
import { createStudent, readStudent, readStudentSingle, updateStudent } from "./student.services.js";

const select_student_id = ["id"];
const select_student_details = ["id", "name", "email", "dob", "phone", "address", "state", "zip", "gender", "is_active", "createdAt"];

const getStudent = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const condition = { _id: user_id, is_active: true };
        const checkStudent = await readStudentSingle(condition, select_student_details);
        if (!checkStudent) throw new Error("Student does not exists");

        responseSend(res, 201, "Student Fetched Successfully", checkStudent);
    } catch (error) {
        next(error);
    }
};

const addStudent = async (req, res, next) => {
    try {
        const { email } = req.body;
        const condition = { email };
        const checkStudent = await readStudentSingle(condition, select_student_id);
        if (checkStudent) throw new Error("Student already registered");

        const studentData = await createStudent(req.body);

        if (!studentData) throw new Error("Something went wrong while register");
        responseSend(res, 201, "Student Created Successfully", studentData);
    } catch (error) {
        next(error);
    }
};

const editStudent = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const condition = { _id: user_id };
        const checkStudent = await readStudentSingle(condition, select_student_id);
        if (!checkStudent) throw new Error("Student does not exists");

        const updateData = await updateStudent(condition, { ...req.body });
        responseSend(res, 201, "Student Updated Successfully", updateData);
    } catch (error) {
        next(error);
    }
};

const deleteStudent = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const condition = { _id: user_id };
        const checkStudent = await readStudentSingle(condition, select_student_id);
        if (!checkStudent) throw new Error("Student does not exists");

        let payload = {
            is_active: false
        }
        const updateData = await updateStudent(condition, payload);
        responseSend(res, 201, "Student Deleted Successfully", updateData);
    } catch (error) {
        next(error);
    }
};

const listStudent = async (req, res, next) => {
    try {
        let where = { is_active: true };

        let page = req.query.page || 0;
        let perPage = req.query.perPage || 10;
        let sortField = req.query.sortField || "createdAt";
        let sortBy = req.query.sortBy || "DESC";

        if (req.query.search) {
            where = {
                ...where,
                $or: [
                    { name: { $regex: '.*' + req.query.search + '.*' } },
                    { email: { $regex: '.*' + req.query.search + '.*' } },
                ]
            }
        }

        const studentData = await readStudent(where, select_student_details, { [sortField]: sortBy }, page, perPage);

        responseSend(res, 201, "Student Data Fetched Successfully", studentData.result, studentData.count);
    } catch (error) {
        next(error);
    }
}

export {
    getStudent,
    addStudent,
    editStudent,
    deleteStudent,
    listStudent,
}