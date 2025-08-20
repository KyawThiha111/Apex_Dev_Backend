const CSProgressRouter = require("express").Router();
const {GetCSProgress,UpdateCSProgress} = require('../../Controller/ComputerScience/progress.js')
const authMiddleware = require("../../MIDDLEWARE/auth.middleware.js")
CSProgressRouter.get("/csprogress",authMiddleware,GetCSProgress);
CSProgressRouter.patch("/csprogress/:subject/:chapterId",authMiddleware,UpdateCSProgress)

module.exports = CSProgressRouter;