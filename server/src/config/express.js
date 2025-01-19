const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');
const cors = require('cors');
//const { session } = require('../middlewares/session');

const secret = 'very-secret-key';

function configExpress(app) {

app.use(cookieParser(secret))  
app.use(bodyParser.json())
app.use(urlencoded( {extended: true}));
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,               
};

app.use(cors(corsOptions));



}


module.exports = { configExpress };