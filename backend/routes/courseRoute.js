import express from "express";
import {createCourse, getLessonsByCycleAndYear, getExercisesByCycleYearAndGroup} from "../controllers/courseController.js";

const router = express.Router();

router.post('/', createCourse);
router.get('/lessons/:cycle/:year', getLessonsByCycleAndYear);
router.get('/exercises/:cycle/:year/:group', getExercisesByCycleYearAndGroup);

export default router;