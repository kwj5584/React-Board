import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {Nav, Button,Navbar, NavDropdown} from 'react-bootstrap'
import {auth} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux'

function NavBar(props) {
  const dispatch = useDispatch()
  const [isLogin,setIsLogin] = useState('false');
  const [name,setName] = useState('');

    useEffect(()=>{
      dispatch(auth())
      .then((res)=>{
//         console.log(res);
        setName(res.payload.name)
        setIsLogin(res.payload.isAuth);
      })
    },[dispatch])
    
    const onLogoutHandler = ()=>{
      axios.post('/api/users/logout')
      .then(res=>{
//         console.log('프론트 로그아웃버튼 클릭',res)
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
    const myPage = ()=>{
      props.history.push({
        pathname:'/myPage',
        state:{name:name}})
    }
    const onRegisterHandler=()=>{
      props.history.push('/register')
    }

  return (
    <div>
    {/* <div style={{justifyContent:'center', height:'100', margin:'40px' }}> */}
      <Navbar bg="light" variant="">
      {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title='Link'>
        <NavDropdown.Item>{ isLogin ? <Button onClick={onLogoutHandler}>로그아웃</Button>
          : <Button onClick={onLoginHandler}>로그인</Button>}
        </NavDropdown.Item>
        <NavDropdown.Item>{<Button onClick={onRegisterHandler}>회원가입</Button>}</NavDropdown.Item>
        <NavDropdown.Item >{<Button onClick={myPage}>마이 페이지</Button>}</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      </Navbar>
    </div>
  )
}

export default withRouter(NavBar)

