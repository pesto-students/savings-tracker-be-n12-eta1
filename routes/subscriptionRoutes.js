import express from "express";

const router = express.Router();

import {
    createSubscription,
    verifySignature,
    getSubscriptions,
    cancelSubscription,
    invoices
} from "../controllers/subscription/subscriptionController.js";


router.get('/', getSubscriptions);
router.post('/', createSubscription);

router.post('/verify', verifySignature);
router.post('/cancel', cancelSubscription);

export default router