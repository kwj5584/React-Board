import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import List from '../List/List'


function LandingPage(props) {
  
  const [name,setName] = useState('');
  const [isLogin,setIsLogin] = useState('false')

  useEffect(()=>{
    axios.get('api/users/auth')
    .then((res)=>{
      console.log('랜딩페이지: ',res);
      setName(res.data.name)
      setIsLogin(res.data.isAuth)
    })
  },[])
  const listAddPage =()=>{
    if(!isLogin){
      alert('로그인 먼저하세요')
      props.history.push('/login')
    }else{
    props.history.push({
        pathname: '/listAdd',
        state:{name: name}})
      }
}
  
  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      width:"100%", height: '100vh'
    }}>
      <List/>
      <br/>
      <Button onClick={listAddPage}>글 작성</Button>
      
    </div>
  )
  }

export default withRouter(LandingPage)


