import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

function List(props){
    // const name = props.name
    const [dataList,setDataList] = useState({
        title:'',
        userName:'',
        contents:''
    })
    const lists = []
    console.log('listpage:',props.name)
    useEffect(()=>{
        axios.get('api/boards/getList')
        .then((res)=>{
            setDataList(res.data)
            // setDataList(lists.concat(res.data))
            // lists.push(res.data)
        })
    },[])
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
                {dataList.map((data,index)=> <tr key={data._id}>
                    <td>{index+1}</td>
                    <td>{data.title}</td>
                    <td>{data.userName}</td>
                </tr>)}
            </tbody>
            </table>
            
        </div>
    )
}

export default withRouter(List)
