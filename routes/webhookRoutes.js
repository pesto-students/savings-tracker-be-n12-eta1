import express from 'express'

const router = express.Router();

import crypto from 'crypto';


import {subscriptionCancelled, subscriptionCharged} from '../controllers/webhooks/webhooksController.js';

router.post('/', async function (req, res, next) {

    const signature = req.get('X-Razorpay-Signature');

    var expected_signature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(req.body).digest('hex');

    if (signature !== expected_signature) {
        res.status(401);
        res.send({error: true, message: 'Signature mismatch.'});

    } else {

        const body = JSON.parse(req.body.toString());

        const {event} = body;

        switch (event) {

            case 'subscription.charged': {

                const subscription = body.payload.subscription.entity, payment = body.payload.payment.entity;

                await subscriptionCharged(subscription, payment);

                break;
            }
            case 'subscription.cancelled': {
                const subscription = body.payload.subscription.entity;

                await subscriptionCancelled(subscription);

                break;
            }
            default: {

            }
        }

        res.send('ok');

    }



});


export default router