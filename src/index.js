require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:29882988@cluster0-a0jj3.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser:true,
    useCreateIndex:true
});
mongoose.connection.on('connected', () =>  {
    console.log('Connected');
});
mongoose.connection.on('error', (err) => {
    console.error('Error mango', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Email ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});