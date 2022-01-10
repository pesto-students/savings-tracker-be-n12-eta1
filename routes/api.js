import express from 'express'

const router = express.Router()

router.post('/', function () {
    console.log("this is test api")
});

export default router