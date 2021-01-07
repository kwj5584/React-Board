import React,{useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import List from '../List/List'
import {auth} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'

function LandingPage(props) {
  const dispatch = useDispatch()

  const [name,setName] = useState('');
  const [isLogin,setIsLogin] = useState('false')

  useEffect(()=>{
    dispatch(auth())
    .then((res)=>{
      console.log('랜딩페이지: ',res);
      setName(res.payload.name)
      setIsLogin(res.payload.isAuth)
    })
  })
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


