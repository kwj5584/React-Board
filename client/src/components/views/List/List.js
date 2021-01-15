import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getList, findTitle, findUserName} from '../../../_actions/user_action'
import {Table} from 'react-bootstrap'
import Pagination from 'react-js-pagination';

function List(props){
    const dispatch = useDispatch()
    const name = props.name
    const [dataList,setDataList] = useState([]) // 데이터 받아오는 배열
    const [searchType,setSearchType] = useState('title') // 찾고자 하는 유형
    const [searchTitle,setSearchTitle] = useState('') // 찾고자 하는 제목
    const [searchUserName, setSearchUserName] = useState('') // 찾고자 하는 작성자

    const [currentPage,setCurrentPage] = useState(1);
    const onhandlePageChange = (e)=>{
        setCurrentPage(e)
    }
    const itemsCountPerPage = 5;
    const pageRangeDisplayed = 5;

    const indexOfLast = currentPage * itemsCountPerPage;
    const indexOfFirst = indexOfLast - itemsCountPerPage;

    

    useEffect(()=>{
        dispatch(getList())
        .then((res=>{
            setDataList(res.payload)
        }))
    },[dispatch])

    useEffect(()=>{
        if(searchType==='title'){
            dispatch(findTitle(searchTitle))   
        .then((res=>{
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
    }
    const searchUserNameHandler = (e) =>{
        setSearchUserName(e.target.value)
        dispatch(findUserName(searchUserName))
    }

    const tmpLists =  dataList.map((data,index) => {
        return(
        <tr key={data._id} data-item={index} onClick={detailPageHandler}>
            <td>{index+1}</td>
            <td>{data.title}</td>
            <td>{data.userName}</td>
        </tr>)
        })
        function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
            }
    const renderLists = currentPosts(tmpLists)
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
                    {renderLists}
                </tbody>
            </Table>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsCountPerPage}
                linkClass='page-link'
                itemClass='page-item'
                totalItemsCount={dataList.length}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={onhandlePageChange}
            />
            {}
        </div>
    )
}

export default withRouter(List)
