const {QuizGenerator} = require("../Controller/QuizGenerator/QuizGenerator.js")
const QuizGenerateRouter = require("express").Router();

QuizGenerateRouter.get("/quizes",QuizGenerator)

module.exports = QuizGenerateRouter;
