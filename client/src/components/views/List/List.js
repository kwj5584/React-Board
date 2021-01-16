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

    const [currentPage,setCurrentPage] = useState(1); // 현재 페이지

    const onhandlePageChange = (e)=>{ // 현재 페이지 setState
        setCurrentPage(e)
    }
    const itemsCountPerPage = 5; // 한 페이지당 보여줄 항목
    const pageRangeDisplayed = 5; // 페이지 5개까지 보여줌

    const indexOfLast = currentPage * itemsCountPerPage; // 현재 페이지에 마지막 인덱스
    const indexOfFirst = indexOfLast - itemsCountPerPage; // 현재 페이지에 첫번째 인덱스

    useEffect(()=>{
        dispatch(getList())
        .then((res=>{
            setDataList(res.payload)
        }))
    },[dispatch]) // componentDidMount 할 때 디스패치를 통해 리스트 불러옴

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
    },[searchTitle,searchUserName,searchType,dispatch]) // 검색 타입이 타이틀이면 제목으로 게시글 검색, 검색 타입이 작성자면 
     // 작성자로 게시글 검색

    const detailPageHandler = (e)=>{
        const index = e.currentTarget.getAttribute('data-item')
        props.history.push({
            pathname:'/detailPage',
            search: `?query=${dataList[index]._id}`,
            state:{_id: dataList[index]._id, name: name}
        })
    } // 인덱스에 해당하는 data-item 불러와서 세부내용 불러오는 페이지로 라우팅 처리

    const onSearchTypeHandler = (e)=>{
        setSearchType(e.target.value)
    } // 타입 바꿔주는 setState

    const searchTitleHandler = (e)=>{
        setSearchTitle(e.target.value)
        dispatch(findTitle(searchTitle))
    } // title로 게시글 검색할 시 dispatch 해줌

    const searchUserNameHandler = (e) =>{
        setSearchUserName(e.target.value)
        dispatch(findUserName(searchUserName))
    } // userName으로 게시글 검색할 시 dispatch 해줌

    const tmpLists =  dataList.map((data,index) => {
        return(
        <tr key={data._id} data-item={index} onClick={detailPageHandler}>
            <td>{index+1}</td>
            <td>{data.title}</td>
            <td>{data.userName}</td>
        </tr>)
        }) // 받아온 getList를 통해 map 해줌

        function currentPosts(tmp) {
            let currentPosts = 0;
            currentPosts = tmp.slice(indexOfFirst, indexOfLast);
            return currentPosts;
            } // 한 페이지에 뿌려줄 게시글을 slice해주는 함수

    const renderLists = currentPosts(tmpLists) // map한 getList를 slice
    
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