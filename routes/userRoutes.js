const express = require("express")

const {home,signup,signin}=require("../controllers/userController.js")

const router = express.Router();

router.get("/",home)
router.post('/register',signup)
router.post('/login',signin)

module.exports=router;