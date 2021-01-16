import React,{useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import List from '../List/List'
import {auth } from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'

function LandingPage(props) {
  const dispatch = useDispatch()

  const [name,setName] = useState('');
  const [isLogin,setIsLogin] = useState('false')
  
  useEffect(()=>{
    dispatch(auth())
    .then((res)=>{
      setName(res.payload.name)
      setIsLogin(res.payload.isAuth)
    })
  },[dispatch]) // 로그인 되어있는지 판별. 로그인 되있으면 isLogin state가 true

  const listAddPage =()=>{
    if(!isLogin){
      alert('로그인 먼저하세요')
      props.history.push('/login')
    }else{
    props.history.push({
        pathname: '/listAdd',
        state:{name: name}})
      }
} // 글 작성 버튼 클릭시 isLogin이 true일 때만 글 작성페이지로 넘어가게 됌

  
  return (
    <div>
      <List name={name}/>
      <div style={{display:'flex', alignItems : 'center', justifyContent:'center'}}>
      <Button  onClick={listAddPage}>글 작성</Button>
      </div>
    </div>
  )
  }

export default withRouter(LandingPage)


