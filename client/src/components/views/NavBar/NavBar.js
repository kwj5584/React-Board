import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {Nav, Form, FormControl,Button,Navbar, NavDropdown} from 'react-bootstrap'
import {FiAlignJustify} from 'react-icons/fi';

function NavBar(props) {
  const [isLogin,setIsLogin] = useState('false');
  const [name,setName] = useState('');

    useEffect(()=>{
      axios.get('api/users/auth')
      .then((res)=>{
        console.log(res);
        setName(res.data.name)
        setIsLogin(res.data.isAuth);
      })
    },[])
    
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
    const myPage = ()=>{
      props.history.push({
        pathname:'/myPage',
        state:{name:name}})
    }
    console.log('name:',name)
  return (
    <div>
      <Navbar bg="light" variant="">
      {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title='Link'>
        <NavDropdown.Item>{ isLogin ? <Button onClick={onLogoutHandler}>로그아웃</Button>
          : <Button onClick={onLoginHandler}>로그인</Button>}
        </NavDropdown.Item>
        <NavDropdown.Item >{<Button onClick={myPage}>마이 페이지</Button>}</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      </Navbar>
    </div>
  )
}

export default withRouter(NavBar)

