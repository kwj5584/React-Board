import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getList} from '../../../_actions/user_action'

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
    console.log('lists:',dataList)

    return( 
        <div>
        <h2>ListPage</h2>
            <table>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                </tr>
            <tbody>
                {
                    dataList.map((data,index) => 
                        <tr key={data._id}>
                            <td>{index+1}</td>
                            <td>{data.title}</td>
                            <td>{data.userName}</td>
                </tr>)
                }
            </tbody>
            </table>
            
        </div>
    )
}

export default withRouter(List)
