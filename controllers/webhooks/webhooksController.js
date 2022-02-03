import Subscription from "../../models/subscription.js";
import User from "../../models/user.js";

async function subscriptionCancelled(razorpaySubscription) {

    try {


        let subscription = await Subscription.findOne({
                                                          razorpay_subscription_id: razorpaySubscription.id,
                                                          status: 'active'
                                                      });

        if (!subscription) {//already cancelled or not found
            return;
        }

        const user = User.findOne({user_id: subscription.user_id});

        subscription.status = 'cancelled';
        subscription.cancelled_on = new Date(razorpaySubscription.ended_at * 1000);

        user.subscription_active = false;

        await subscription.save();
        await user.save();


    }
    catch (e) {
        console.error(e);
    }

}

async function subscriptionCharged(razorpaySubscription, razorpayPayment) {
    try {

        let subscription = await Subscription.findOne({
                                                          razorpay_subscription_id: razorpaySubscription.id
                                                      });

        if (!subscription) {
            return;
        }

        let payments = subscription.payments;
        let razorpayPaymentId = razorpayPayment.id;
        let paymentExists = false;


        if (!payments) {
            payments = [];
        }

        if (payments.length > 0) {
            paymentExists = payments.find(payment => payment.id === razorpayPaymentId);
        }

        if (!paymentExists) {
            payments.push({
                              id: razorpayPaymentId,
                              amount: razorpayPayment.amount,
                              currency: razorpayPayment.currency,
                              invoice_id: razorpayPayment.invoice_id,
                              order_id: razorpayPayment.order_id,
                              created_at: new Date(razorpayPayment.created_at * 1000)
                          });
            subscription.payments = payments;

            await subscription.save();
        }


    }
    catch (e) {
        console.error(e);
    }

}

export {subscriptionCancelled, subscriptionCharged}