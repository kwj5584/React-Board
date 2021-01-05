import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import List from '../List/List'


function LandingPage(props) {
  
  const [name,setName] = useState('');
  useEffect(()=>{
    axios.get('api/users/auth')
    .then((res)=>{
      console.log(res);
      setName(res.data.name)
    })
  },[])
  
  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      width:"100%", height: '100vh'
    }}>
      <List name={name}/>
      
    </div>
  )
  }

export default withRouter(LandingPage)


