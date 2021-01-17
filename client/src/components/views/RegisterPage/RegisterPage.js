import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import ReCAPTCHA from 'react-google-recaptcha'

function RegisterPage(props) {
  const dispatch = useDispatch();
  
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [captcha, setCaptcha] = useState('')

  const onNameHandler = (event)=>{
    setName(event.currentTarget.value)
  }
  const onEmailHandler = (event)=>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event)=>{
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event)=>{
    setConfirmPassword(event.currentTarget.value)
  }

  const captchaOnChange =  (value)=>{
    setCaptcha(value);
  }
  const onSubmitHandler = (event) =>{
    event.preventDefault();
  

  if(Password !== ConfirmPassword){
    return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
  }
  else if(!captcha){
    return alert('로봇이 아님을 증명해야합니다.')
  }
  else{
    let body = {
      name:Name,
      email:Email,
      password:Password
    }
    dispatch(registerUser(body))
    .then(res =>{
      if(res.payload.success){
        props.history.push('/login')
      }else{
        alert("Failed to Register")
      }
    })
  }
}  
  
  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      width:"100%", height: '50vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}>

      <label>Name : </label>
        <input type='text' value={Name} onChange={onNameHandler}/>

        <label>Email : </label>
        <input type='email' value={Email} onChange={onEmailHandler}/>

        <label>Confirm Password : </label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>

        <label>Password : </label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

        <br/>
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={captchaOnChange}
        />
        <br/>
        <button onClick={onSubmitHandler}>회원가입</button>
      </form>
    </div>
  )

  }
export default withRouter(RegisterPage)
