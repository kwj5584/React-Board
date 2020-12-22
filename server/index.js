const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require('./models/User');
const {auth} = require('./middleware/auth')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERPASSWORD}@cluster0.2zeyh.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
  useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
.then(()=>{ console.log('MongoDB Connected...')})
.catch(err=> console.log(err));



app.get('/api/hello', (req,res)=>{

  res.send('hello');
})

app.post('/api/users/register', (req,res)=>{
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 저장
  const user = new User(req.body);

  user.save((err,userInfo)=>{
    if(err) res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  });
})

app.post('/api/users/login',(req,res)=>{
  //요청된 이메일을 데이터베이스에서 있는지 찾음.
  User.findOne({ email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message:'제공된 이메일에 해당하는 유저가 없습니다.'
      })
    }
      //요청된 이메일이 데이터베이스에 존재하면 맞는 비밀번호인지 확인
      user.comparePassword(req.body.password, (err,isMatch)=>{
        if(!isMatch) return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})

        //비밀번호까지 맞으면 토큰 생성
        user.generateToken((err,user)=>{
          if(err) return res.status(400).send(err);
          
          //토큰을 저장
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})
        })
      })
      
  })  
})

app.get('/api/users/auth', auth, (req,res)=>{
  
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true, // 0이면 일반유저 1이면 admin
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    role : req.user.role
  })
})

app.get('/api/users/logout',auth, (req,res)=>{
  console.log('user:',req.user)
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{ //미들웨어에서 _id값 찾아줌
    if(err) return res.json({success:false, err});
    return res.status(200).send({success:true})
  }) 
})

app.listen(port, ()=> console.log(`App listening on port ${port}`));