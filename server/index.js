const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const port = 5000;

// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const {User} = require('./models/User');
// const {auth} = require('./middleware/auth')

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use(cookieParser());

const userApi = require('./Api/User/userApi')
const boardApi = require('./Api/Board/boardApi')

app.use('/api/users',userApi)
app.use('/api/boards',boardApi)

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERPASSWORD}@cluster0.2zeyh.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
  useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
.then(()=>{ console.log('MongoDB Connected...')})
.catch(err=> console.log(err));

app.listen(port, ()=> console.log(`App listening on port ${port}`));

module.exports = app;