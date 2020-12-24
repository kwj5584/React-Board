import React,{useEffect} from 'react'
import axios from 'axios';

function LoginPage() {
  useEffect(()=>{
    axios.get('/api/hello')
    .then(res=>console.log(res))
  },[])
  
  return (
    <div>
      LoginPage
    </div>
  )
}

export default LoginPage
