import express from 'express';
import admin from 'firebase-admin';
import 'dotenv/config'

admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
        projectId: process.env.PROJECT_ID,
    }),
    databaseURL: "https://miboticadev-1586837070418.firebaseio.com"
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/subscribe-subsidiarie', (req, res) => {
    const { token } = req.body;
    admin.messaging().subscribeToTopic([token], '1540-3221')
        .then(response => {
            console.log(response);
            res.send('Subscribed to topic');
        })
        .catch(error => {
            console.log(error);
            res.send('Error subscribing to topic');
        });

});

app.post('/subscribe-company', (req, res) => {
    const { token } = req.body;

    admin.messaging().subscribeToTopic([token], '314-3221')
        .then(response => {
            console.log(response);
            res.send('Subscribed to topic');
        })
        .catch(error => {
            console.log(error);
            res.send('Error subscribing to topic');
        });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
