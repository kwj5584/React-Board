import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getList} from '../../../_actions/user_action'
import {Table} from 'react-bootstrap'
function List(props){
    const dispatch = useDispatch()
    // const name = props.name
    const [dataList,setDataList] = useState([])
    
    // console.log('listpage:',props.name)
    useEffect(()=>{
        dispatch(getList())
        .then((res=>{
            setDataList(res.payload)
        }))
    },[dispatch])
    // console.log('lists:',dataList)

    const detailPageHandler = (e)=>{
        const index = e.currentTarget.getAttribute('data-item')
        console.log('clicked:',index)
        props.history.push({
            pathname:'/detailPage',
            search: `?query=${dataList[index]._id}`,
            state:{_id: dataList[index]._id}
        })
        console.log(dataList[index])
    }
    return( 
        <div>
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
