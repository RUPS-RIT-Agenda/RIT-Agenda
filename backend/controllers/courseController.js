import Course from "../models/Course.js";
import { validationResult } from "express-validator";

export const createCourse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        name,
        professor,
        type,
        firstExecution,
        lastExecution,
        duration,
        classroom,
        studyCycle,
        schoolYear,
        group
    } = req.body;

    try {
        const newCourse = new Course({
            name,
            professor,
            type,
            firstExecution,
            lastExecution,
            duration,
            classroom,
            studyCycle,
            schoolYear,
            group
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getLessonsByCycleAndYear = async (req, res) => {
    const { cycle, year } = req.params;

    try {
        const lessons = await Course.find({
            studyCycle: cycle,
            schoolYear: Number(year),
            type: 'lesson'
        });

        if (!lessons.length) {
            return res.status(404).json({ message: "No lessons found for the specified cycle and year" });
        }

        res.status(200).json(lessons);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getExercisesByCycleYearAndGroup = async (req, res) => {
    const { cycle } = req.params;
    const { year, group } = req.query;

    try {
        const filter = {
            studyCycle: cycle,
            schoolYear: Number(year),
            type: 'exercises'
        };

        if (group) {
            filter.group = Number(group);
        }

        const exercises = await Course.find(filter);

        if (!exercises.length) {
            return res.status(404).json({ message: "No exercises found for the specified criteria" });
        }

        res.status(200).json(exercises);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
