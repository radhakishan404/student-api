import studentSchema from "../../models/student.model.js";

const readStudent = async (
    find = {},
    select = {},
    sort = {},
    page = 0,
    limit = 10,
) => {
    try {
        const result = await studentSchema
            .find(find)
            .select(select)
            .sort(sort)
            .skip(page * limit)
            .limit(limit);

        const count = await studentSchema.countDocuments(find);

        return {result, count};
    } catch (error) {
        throw new Error(error);
    }
};

const createStudent = async (studentData) => {
    try {
        const result = new studentSchema(studentData);
        await result.save();
        return result.toObject();
    } catch (error) {
        throw new Error(error);
    }
}

const readStudentSingle = async (filter, select = {}) => {
    try {
        const result = await studentSchema.findOne(filter).select(select).lean();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

const updateStudent = async (filter, updateData, select = {}) => {
    try {
        const result = await studentSchema
            .findOneAndUpdate(filter, updateData, { new: true, runValidators: true })
            .lean();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export {
    readStudent,
    createStudent,
    readStudentSingle,
    updateStudent,
}