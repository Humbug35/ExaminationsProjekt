import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import loginRoute from './Routes/Auth/login';
import registerRoute from './Routes/Auth/register';
import logoutRoute from './Routes/Auth/Logout';
import outloadingRoutes from './Routes/Employee/Outloading/outloading';
import deliveredRoutes from './Routes/Employee/Delivered/delivered';
import orderRoutes from './Routes/Order/Order';
import { dbConfig } from './DB/db';


const app = express();


mongoose.connect(dbConfig, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to database'))
    .catch(error => console.log('Error: ', error))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'linus', resave: false, saveUninitialized: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, sid"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next()
});

app.get('/checktoken', (req, res) => {
    if(!req.session.token) {
        return res.status(401).json({
            isAuthenticated: false,
            message: 'Unauthorized'
        })
    }
    res.status(200).json({
        isAuthenticated: true,
        user: req.session.user
    })
})
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('/outloading', outloadingRoutes)
app.use('/delivered', deliveredRoutes)
app.use('/order', orderRoutes)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
