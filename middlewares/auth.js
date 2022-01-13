import {initializeApp, cert} from 'firebase-admin/app';

import {getAuth} from 'firebase-admin/auth';

import serviceAccount from '../firebase-service-account-config.js';

const firebaseApp = initializeApp({credential: cert(serviceAccount)});

const appAuth = (req, res, next) => {

    const token = req.get('X-Auth-Token');//header

    getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            //token valid
            //console.log(JSON.stringify(decodedToken));
            req.user_id = decodedToken.uid;
            req.phone_number = decodedToken.phone_number;
            return next();
            

        })
        .catch((error) => {
            res.status(401).send();
        });

};

export default appAuth;