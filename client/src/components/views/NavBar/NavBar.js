import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {Nav, Button,Navbar, NavDropdown} from 'react-bootstrap'
import {auth} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'

function NavBar(props) {
  const dispatch = useDispatch()
  const [isLogin,setIsLogin] = useState(false); // 로그인 여부 state
  const [name,setName] = useState(''); // 로그인 유저 state

    useEffect(()=>{
      dispatch(auth())
      .then((res)=>{
        setName(res.payload.name)
        setIsLogin(res.payload.isAuth);
      })
    }) // 로그인 되있는지 auth action함수로 판별. 
    
    const onLogoutHandler = ()=>{
      axios.post('/api/users/logout')
      .then(res=>{
        if(res.data.success){
          alert('로그아웃 성공')
          props.history.push('/login')
        }else{
          alert('로그아웃 실패')
        }
      })
    } // 로그아웃 버튼 클릭시 logout api호출
    const onLoginHandler = ()=>{
      props.history.push('/login')
    }
    const myPage = ()=>{
      props.history.push({
        pathname:'/myPage',
        state:{name:name}})
    } 
    const onRegisterHandler=()=>{
      props.history.push('/register')
    }

  return (
    
    <div style={{justifyContent:'center', height:'100', }}>
      <Navbar bg="light" variant="">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title='Link'>
        <NavDropdown.Item>{ isLogin ? <Button onClick={onLogoutHandler}>로그아웃</Button>
          : <Button onClick={onLoginHandler}>로그인</Button>}
        </NavDropdown.Item>
         {/* 로그인 되어있으면 로그아웃 버튼 활성화. 로그인 되어있지않으면 로그인 버튼 활성화 */}
        <NavDropdown.Item>{<Button onClick={onRegisterHandler}>회원가입</Button>}</NavDropdown.Item>
        <NavDropdown.Item >{<Button onClick={myPage}>마이 페이지</Button>}</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      </Navbar>
    </div>
    
  )
}

export default withRouter(NavBar)

