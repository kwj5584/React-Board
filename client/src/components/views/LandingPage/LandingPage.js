import React,{useEffect} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function LandingPage(props) {
  useEffect(() => {
    axios.get('/api/hello')
    .then( res => console.log(res))
    }, [])
    // const isLogin = props.location.state.userInfo.loginSuccess
    // console.log('userInfo :', isLogin)
    const onLogoutHandler = ()=>{
      axios.post('/api/users/logout')
      .then(res=>{
        console.log('프론트 로그아웃버튼 클릭',res)
        if(res.data.success){
          alert('로그아웃 성공')
          props.history.push('/login')
        }else{
          alert('로그아웃 실패')
        }
      })
    }
    const onLoginHandler = ()=>{
      props.history.push('/login')
    }
  
  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      width:"100%", height: '100vh'
    }}>
      <h2>시작페이지</h2>
      <button onClick={onLogoutHandler}>로그아웃</button>
      {/* { isLogin ?<button onClick={onLogoutHandler}>로그아웃</button>
      : <button onClick={onLoginHandler}>로그인</button>
      } */}
    </div>
  )
  }

export default withRouter(LandingPage)

export default withRouter(LandingPage)
