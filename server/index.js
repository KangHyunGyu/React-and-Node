const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const config = require('./config/key');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { userInfo } = require('os');
mongoose.connect('mongodb+srv://Administrator:admin@gyuplate.wtrhg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) =>   res.send('Hello World!~~안뇽하세요 케케케~ 새해 복 많이 받으세용'))

app.post('/register', (req, res) => {

  //회원가입 할때 필요한 정보들을 Clint 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true
      })
    })

})

app.post('/login' , (req, res)=> {

  //요청된 이메일을 DB에 있는지 찾기
  User.findOne({ email: req.body.email}, (err, userInfo)=>{
    if(!userInfo){
      return res.json({
        loginSuccess : false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      })
    }

    //요청된 이메일이 DB에 있다면 비밀번호가 일치하는지 확인
    user.comparePassword( req.body.password , (err, isMatch )=> {
      if(!isMatch)
      return res.json({ loginSuccess : false , message : "비밀번호가 틀렸습니다."})

      //비밀번호가 일치하면 Token 생성
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);

          //토큰을 어디에 저장할지? 쿠키 , 로컬스토리지
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id })



      })

    })

  })

  

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})