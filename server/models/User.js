const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;//salt가 몇 글자인지
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema

const userSchema = new Schema({
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


userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
      //비밀번호를 암호화 시킨다.
      bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) return next(err)

          bcrypt.hash(user.password, salt, function (err, hash) {
              if (err) return next(err)
              user.password = hash
              next()
          })
      })
  } else {
      next()
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {

  //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  })
}

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // console.log('user._id', user._id)

  // jsonwebtoken을 이용해서 token을 생성하기 
  var token = jwt.sign(user._id.toHexString(), 'secretToken')
  // user._id + 'secretToken' = token 
  // -> 
  // 'secretToken' -> user._id

  user.token = token
  user.save(function (err, user) {
      if (err) return cb(err)
      cb(null, user)
  })
}

userSchema.statics.findByToken = function(token,cb){
  var user = this;
  // console.log('server-User.js: ', token)
//토큰 복호화
jwt.verify(token, 'secreToken', function(err,decoded){
  // console.log('decoded:',decoded)
  //유저 아이디를 이용해서 유저를 찾은 뒤
  // 클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인

  user.findOne({ "token" : token},(err,user)=>{
    if(err) return cb(err);
    cb(null, user);
  })
})
}



const User = mongoose.model('User',userSchema);
module.exports = {User};