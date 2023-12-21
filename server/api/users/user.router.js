const router = require('express').Router();

const auth = require('../middleware/auth');
const { createUser, getUsers, getUserById, login, getUserByIdNumber } = require('./user.controller');


router.post("/", createUser);
router.get("/all", getUsers);
router.get('/',auth, getUserById)
router.post('/id',getUserByIdNumber)
router.post("/login", login)

module.exports = router;