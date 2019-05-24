import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const express = require('express');
const myParser = require("body-parser");
const cors = require('cors'); // CORS Express middleware to enable CORS Requests.

const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(myParser.urlencoded({ extended: true }));

//utouoglfxcemlogl
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

const creds: admin.ServiceAccount = {
    // type: "service_account",
    projectId: "grace-clean",
    // private_key_id: "b2058faf05d42680493a70f3e766f18248561825",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC2VesJoLxDe0bZ\nODFkr6JMtMkEwVpun5G2L5qeGzKzRi5nuvsZY+9kIC6S2zcNKjydwkjGZF0cM6Uv\n2aWjBMO1yl6628UVOcdSxnuUDKEB7CFDgIzWOMTgiSLdvbisVyCdeGNthgjXaCiY\nZFONKcdsLsAURWp3mqxXvRMKMymtsjXH1bWXHS281j0boH8J50B+iV3J+06KUjc4\ngnL1piuekFm4MQ9cKyVgw167Lmn02x5nk1Q2w1nMARF9HuTlhh05yZ2b4eG54wxK\nIVI1ku4hRctKnPrgUindoOqIo1LCmdaeFkn/Q2TCocAwt2P70p/nls/+k1ZiQno6\nIb8+lGj3AgMBAAECggEAJ0hweGUMWn+LPo5YOeiLD3qdmmwr1wyC4Jz1811JuY0D\nv25t3cUFlO1IC3S2Mhxo7dYnRrLlyocn7hy2jl4e6iIc8aYaml2V33QKuNVVtOvS\nKNBfx2F4rSVugRZ4XIzy5mpDBZwseHgk0tw+kfmv0NNrp5JjAzysJ8UA/qASOSz/\nw4qNhWbUY9IO6BaXNJhJn6dXuUcznU9jXREpDMeb2YVzku6DRPI99quqk11sjMxY\nPQubxOSz7jgHJ3aE5RcYrz0ByWa0IyuMbyZrCFkUgPI6QU3x57T3r39kRVusEllP\ng7mLV2i//ac54Sz0zgJ3x8KtLkeLkhs81f1c+83B+QKBgQDwD1h9DC1cx1Ob7JAT\nEF2Wy6pVKKJjsuppgztRDHDkTldEQZrEoyaPn2mvBWx+Rfiz72hem9OA65Q/L2Ea\nXej/IMLMdUKfBWqIT9TA2MExcfBMoDqa/xl168Rirxm5d+65JF05BNZR4s7DwPC6\nTf5MZXTalnIgP5uKb5AFnZxMuQKBgQDCcVi7L6ZvW30fbVEbkdZ/drac69AA3s2I\nfnexsMXMTTLfTJN6Wn3yNzVPq3WJVjnaDJ4mEbjsMlUZdXHsu1dtH+Bsm3ntoLRk\nIIo6VpbZs/imzpHtn/POpvz/kq7JYjauPc7gbKPuRQlJpimtIjKu+Y/g62lwV4/L\nJ1CEgtlrLwKBgAhjYOIttMATLva502b3IW4Ne8wx+Uqmi85YCZCRcLhpjF8UM8Y/\nNS+7kEPPWrUm2MPgz7LOmxtcH/f9PdVgBq4zhNsEFenclJZiw7phWI7TvmPPDX0x\nAMDAFkKkf6+dYzgQ7zj41ExUMolgiojYBNTCjsy8iQxbbKHvuAaaNUXxAn9HZVcv\nZE+4k99dqsYdWW9pXi2vcObvauANPmK03DPE0JPdakC8rH2ScrMgjdSamQ6lAf0P\n/XHpSJH2xykNw7xWVV4SgwRCPMAAA/K9eQ3q4iprFW5/0juzpZ1AOpvzVhy93fQY\nc8u9sZu3b0veRrBVj01FSStuFLi337ew8FrlAoGBAOvsEyknZ81qJeWju9ESESxX\nmXpIvM58ax5jt3aI00zk/c/JUiTswsMFHNA+UI578ELdDJ0k6vojDfZ7NYYwCDEd\nCPfLt/lrmvuqbxk5UUvqg+kXNphSFk4ckgeHmcWBmj0pVOFnYgORGYmqo4L+A+IW\nb7nTL136hWfWKBb6fNCF\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-pynx3@grace-clean.iam.gserviceaccount.com",
    // client_id: "117962829309602158215",
    // auth_uri: "https://accounts.google.com/o/oauth2/auth",
    // token_uri: "https://oauth2.googleapis.com/token",
    // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    // client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pynx3%40grace-clean.iam.gserviceaccount.com"
}


admin.initializeApp({
    credential: admin.credential.cert(creds),
    databaseURL: "https://grace-clean.firebaseio.com"
});

app.post('/postContactMessage', async (req: functions.https.Request, res: functions.Response) => {    
    let form = {};

    const err = { err: "unable to parse form" };
    (req && req.body) ? form = req.body : res.status(500).json(err);

    admin.firestore().collection('messages').add(form)
        .then(val => res.status(200).json({ msg: "contact form sent successully" }))
        .catch(error => res.status(500).send(error));

    // Building Email message.
    const mailOptions = {
        from: '"Grace Clean AZ" <hello@gracecleanaz.com>',
        to: req.body.email,
        subject: 'Thank you for contacting Grace Clean AZ!',
        text:  `Thank you for reaching out to us with your concerns. We will reach back to you as soon as possible. 
                Feel free to give us a call at 602-626-4902.

                On ${req.body.date}, you reached out to us:
                Name: ${req.body.name}
                Email: ${req.body.email}

                Message: 
                ${req.body.message}
                `
    };
    try {
        await mailTransport.sendMail(mailOptions);
        console.log(`Contact message email sent.`);
    } catch (error) {
        console.error('There was an error while sending the email:', error);
    }
});

app.get('/getAvailableTimes/:date', async (req: functions.https.Request, res: functions.Response) => {
    let appt: any;
    const err = { err: "unable to parse appt" };
    (req && req.params && req.params.date) ? appt = req.params.date : res.status(500).json(err);

    
    admin.firestore().collection('appointments').doc(appt).listCollections()
        .then((val) => {
            const times = [];
            val.map(item => { times.push(item.id); });
            return res.status(200).send(times);
        })
        .catch((error) => {
            return res.status(500).send(error);
        });
});

app.post('/postAppointmentTime', async (req: functions.https.Request, res: functions.Response) => {
    let appt: any;

    const err = { err: "unable to parse appt" };
    (req && req.body) ? appt = req.body : res.status(500).json(err);

    admin.firestore().collection('appointments').doc(appt.date).collection(appt.time).add(appt)
        .then(val => res.status(200).json({ msg: "appointment set successfully" }))
        .catch(error => res.status(500).send(error));

    const mailOptions = {
        from: '"Grace Clean AZ" <hello@gracecleanaz.com>',
        to: req.body.email,
        subject: '',
        text: ''
    };

    // Building Email message.
    mailOptions.subject = 'Thanks for setting an appointment!';
    mailOptions.text = 'We will be getting back to you as soon as possible. Thank you for your patience.';

    try {
        await mailTransport.sendMail(mailOptions);
        console.log(`New subscription confirmation email sent to:`);
    } catch (error) {
        console.error('There was an error while sending the email:', error);
    }
});

// Expose the API as a function
exports.api = functions.https.onRequest(app);
