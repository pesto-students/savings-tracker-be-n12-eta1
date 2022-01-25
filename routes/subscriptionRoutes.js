import express from "express";

const router = express.Router();

import {
    createSubscription,
    verifySignature,
    getSubscription,
    cancelSubscription
} from "../controllers/subscription/subscriptionController.js";


router.get('/', getSubscription);
router.post('/', createSubscription);

router.post('/verify', verifySignature);
router.post('/cancel', cancelSubscription);

export default router