// import axios from 'axios'
import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action'

const authFunction = (SpecificComponent, option, adminRoute = null)=>{
    //option null => 아무나 출입 가능
    //option true => 로그인한 유저만 출입 가능
    //option false => 로그인한 유저는 출입 불가능

    //adminRoute => admin만 출입 가능
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(auth()).then(res=>{
                console.log(res)
                // 로그인 하지 않은 상태
                if(!res.payload.isAuth){
                    if(option){
                        alert('로그인 먼저 하세요')
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !res.payload.isAdmin){
                        alert('관리자만 접근 가능합니다.')
                        props.history.push('/')
                    }else{
                        if(option===false){
                            alert('로그인이 되어있습니다.')
                            props.history.push('/')
                        }
                    }
                }
            })
            
        },[])

        return(
            <SpecificComponent/>
        )


    }

    return AuthenticationCheck
}

export default authFunction