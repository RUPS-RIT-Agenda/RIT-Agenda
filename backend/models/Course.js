import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    professor: {
        type: String,
        required: true,
        maxlength: 30,
    },
    type: {
        type: String,
        required: true,
        enum: ['lesson', 'exercises'], 
    },
    firstExecution: {
        type: Date,
        required: true,
    },
    lastExecution: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    classroom: {
        type: String,
        required: true,
    },
    studyCycle: {
        type: String,
        enum: ["UNI", "MAG"],
        required: true,
    },
    schoolYear: {
        type: Number,
        min: 1,
        max: 3,
        required: true,
    },
    group: {
        type: Number,
        required: false, 
    }
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
