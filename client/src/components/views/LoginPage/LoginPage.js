import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {loginUser } from '../../../_actions/user_action'
import {Button} from 'react-bootstrap'
function LoginPage(props) {

  const dispatch = useDispatch();
  
  const [Email, setEmail] = useState("") // Eamil State
  const [Password,setPassword] = useState("") // Password State

  const onEmailHandler = (event)=>{
    setEmail(event.currentTarget.value)
  } // SetEmail

  const onPasswordHandler = (event)=>{
    setPassword(event.currentTarget.value)
  } // SetPassword

  const onSubmitHandler = (event) =>{
    event.preventDefault();

    let body = {
      email:Email,
      password:Password
    } // body 변수에 Email, Password 담아 둠.
    dispatch(loginUser(body)) // loginUser action함수에 body 전달
    .then(res =>{
      if(res.payload.loginSuccess){ // 백엔드에서 loginSuccess값이 true로 넘어오면 
        console.log('로그인데이터 : ',res)
        props.history.push({
          pathname:'/',
          state: {userInfo :res.payload}
        }) // LandingPage로 유저정보 담아서 라우팅
      }else{
        alert('Error')
      }
    })
  }

  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      width:"100%", height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}>
        <label>Email : </label>
        <input type='email' value={Email} onChange={onEmailHandler}/>
        <label>Password : </label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>

        <br/>
        <Button onClick={onSubmitHandler}>Login</Button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage)
