const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//Configuration
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(require('./routes/route'))

//Initializing server
app.listen(app.get('port'), () =>{
    console.log(`Server listening in port ${app.get('port')}`);
    console.log(`http:\\localhost:${app.get('port')}`);
})