import RazorpayInstance from "../../razorpay.js";

import crypto from 'crypto';
import {makeErrorsArray} from "../../utils/errors.js";
import Subscription from "../../models/subscription.js";
import User from "../../models/user.js";


async function getSubscriptions(req, res, next) {

    try {
        const user_id = req.user_id;

        let subscriptions = await Subscription.find({user_id, status: {$ne: 'created'}}).sort({createdAt: 'desc'});

        res.send({success: true, subscriptions});

    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send({success: false, errors: ['Server Error. Please try again']});
    }

}

async function createSubscription(req, res, next) {


    try {

        const user_id = req.user_id;

        let subscription = await Subscription.findOne({user_id, status: {$ne: 'cancelled'}});

        if (subscription) {
            if (subscription.status === 'active') {
                res.statusCode = 400;
                res.send({success: false, errors: ['Subscription is active']});
                return;
            }
        } else {//create new if not found or cancelled
            const razorpayResponse = await RazorpayInstance.subscriptions.create({
                                                                                     plan_id: process.env.RAZORPAY_SUBSCRIPTION_PLAN_ID,
                                                                                     customer_notify: 1,
                                                                                     quantity: 1,
                                                                                     total_count: 10,
                                                                                 });

            subscription = new Subscription({
                                                user_id,
                                                razorpay_subscription_id: razorpayResponse.id,
                                                status: 'created',
                                                currency: 'INR',
                                                amount: 999
                                            });
            await subscription.save();

        }

        const user = await User.findOne({user_id}, ['first_name', 'last_name', 'email', 'phone_number']);

        res.send({
                     success: true,
                     razorpay_subscription_id: subscription.razorpay_subscription_id,
                     user
                 });
    }
    catch (e) {

        console.error(e);
        res.statusCode = 500;
        res.send({success: false, errors: ['Server Error. Please try again']});

    }


}

async function verifySignature(req, res, next) {

    try {

        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature
        } = req.body;

        var hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

        const data = hmac.update(razorpay_payment_id + "|" + razorpay_subscription_id);
        const digest = data.digest('hex');

        if (digest === razorpay_signature) {
            //good
            const user_id = req.user_id;

            const subscription = await Subscription.findOne({user_id, razorpay_subscription_id});

            subscription['razorpay_payment_id'] = razorpay_payment_id;
            subscription.paid_on = new Date;
            subscription.status = 'active';

            const user = await User.findOne({user_id});
            user.subscription_active = true;

            await subscription.save();
            await user.save();

            res.send({success: true});
        }
        else {

            res.statusCode = 400;

            res.send({success: false, errors: ['Payment verification failed']});
        }

    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send({success: false, errors: ['Server Error. Please try again']});
    }


}

async function cancelSubscription(req, res) {

    try {

        const user_id = req.user_id;

        let subscription = await Subscription.findOne({user_id, status: 'active'});

        if (!subscription) {
            res.statusCode = 400;
            res.send({success: false, errors: ['No active Subscription found']});
            return;
        }

        try {
            const razorpayResponse = await RazorpayInstance.subscriptions.cancel(subscription.razorpay_subscription_id);

        }
        catch (err) {
            console.log(err);
            res.statusCode = 400;
            res.send({success: false, errors: [err.error.description]});
            return;
        }

        subscription.status = 'cancelled';
        subscription.cancelled_on = new Date;

        const user = User.findOne({user_id});

        user.subscription_active = false;
        await subscription.save();
        await user.save();

        res.send({success: true, message: ''});


    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send({success: false, errors: ['Server Error. Please try again']});
    }

}

export {createSubscription, verifySignature, getSubscriptions, cancelSubscription}