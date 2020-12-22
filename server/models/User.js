const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name:{
    type:String,
    maxlength:50
  },
  email:{
    type:String,
    trim: true, // 띄어쓰기 없이 읽어줌
    unique:1 // 중복방지
  },
  password:{
    type:String,
    minlength:5
  },
  role:{
    type : Number, // number가 1이면 관리자, 0ㅇ이면 유저
    default: 0
  },
  token:{
    type:String
  },
  tokenExp:{ // 토큰 유효시간
    type:Number
  }
})

userSchema.pre('save',function(next){
  const user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(saltRounds,function(err,salt){
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(err,hash){
        if(err) return next(err)
        user.password = hash;
        next()
      })
    })
  } else{
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
  bcrypt.compare(plainPassword,this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb){

  const user = this;
  //jsonwebtoken을 이용해서 token 생성
  const token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token
  user.save(function(err,user){
    if(err) return(err);
    cb(null,user)
  });
}

userSchema.statics.findByToken = function(token,cb){
  const user = this;


  jwt.verify(token, 'secretToken', function(err,decoded){
    //유저 아이디를 이용해 유저를 찾은 뒤
    // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

    user.findOne({_id:decoded, token:token}, function(err,user){
      if(err) return cb(err);
      cb(null, user); // 유저정보 전달
    })

  } )
}

const User = mongoose.model('User',userSchema);
module.exports = {User};