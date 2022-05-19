import { buffer } from 'micro';
import * as admin from 'firebase-admin';

let serviceAccount = require("../../../permission.json");

const app = !admin.apps.length ?
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    }) :
    admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfilOrder = async (session) => {
    return app.firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`Success: Order Id: ${session.id} has been added to DB`)
        });
}

export default async (req, res) => {
    if (req.method === 'POST') {
        const reqBuffer = await buffer(req);
        const payload = reqBuffer.toString();
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log("ERROR", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        console.log(event)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            return fulfilOrder(session)
                .then(() => res.status(200))
                .catch(err => res.status(400).send(`Webhook Error : ${err.message}`));
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}