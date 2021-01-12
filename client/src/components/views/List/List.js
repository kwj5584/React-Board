import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getList, findTitle, findUserName} from '../../../_actions/user_action'
import {Table} from 'react-bootstrap'
function List(props){
    const dispatch = useDispatch()
    const name = props.name
    const [dataList,setDataList] = useState([])
    const [searchType,setSearchType] = useState('title')
    const [searchTitle,setSearchTitle] = useState('')
    const [searchUserName, setSearchUserName] = useState('')
    useEffect(()=>{
        dispatch(getList())
        .then((res=>{
            setDataList(res.payload)
        }))
    })
    useEffect(()=>{
        if(searchType==='title'){
            dispatch(findTitle(searchTitle))   
        .then((res=>{
            console.log('test:',res.payload)
            setDataList(res.payload)
        }))
        }
        else{
            dispatch(findUserName(searchUserName))
            .then(res=>setDataList(res.payload))
        }
    },[searchTitle,searchUserName,searchType,dispatch])

    const detailPageHandler = (e)=>{
        const index = e.currentTarget.getAttribute('data-item')
        console.log('clicked:',index)
        props.history.push({
            pathname:'/detailPage',
            search: `?query=${dataList[index]._id}`,
            state:{_id: dataList[index]._id, name: name}
        })
    }
    const onSearchTypeHandler = (e)=>{
        setSearchType(e.target.value)
    }
    const searchTitleHandler = (e)=>{
        setSearchTitle(e.target.value)
        dispatch(findTitle(searchTitle))
        console.log('searchTitle',searchTitle)
        
    }
    const searchUserNameHandler = (e) =>{
        setSearchUserName(e.target.value)
        dispatch(findUserName(searchUserName))
        console.log('searchUserName:',searchUserName)
        
    }
    return( 
        
        <div style={{justifyContent:'center', height:'100', margin:'40px' }}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <select name='searchType' onChange={onSearchTypeHandler}>
                    <option >Title</option>
                    <option >userName</option>
                </select>
            <> {
                searchType==='title' ? <input type='text' style={{height:'25px', width:'30%'}} onChange={searchTitleHandler} placeholder='Search Title...'></input>
                : <input type='text' style={{height:'25px', width:'30%'}} onChange={searchUserNameHandler} placeholder='Search UserName...'></input>
            }        </>
            </div>
            <br/>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                </tr>
                </thead>
                <tbody>
                {
                    dataList.map((data,index) => 
                        <tr key={data._id} data-item={index} onClick={detailPageHandler}>
                            <td  >{index+1}</td>
                            <td  >{data.title}</td>
                            <td  >{data.userName}</td>
                </tr>)
                }
            </tbody>
            </Table>
        </div>
    )
}

export default withRouter(List)