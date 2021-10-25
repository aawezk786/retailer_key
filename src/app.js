const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config');


//Routes


const authRoutes = require('./routes/authRoutes');



//PARSER SETTING
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false,limit:'50mb'}));
app.use(express.json({limit:'50mb'}));

//CORS SETTING
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Main Routes

app.use('/api', authRoutes.routes);


//MIDDLEWARE
app.use((req, res, next) => {
    const error = new Error('Bad Request');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



 
module.exports = app;


