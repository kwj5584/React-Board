import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getDetail} from '../../../_actions/user_action'
import {Button} from 'react-bootstrap'

function ListDetailPage(props){
    const _id = props.location.state._id
    // console.log('listdetailpage:',_id)
    const dispatch = useDispatch();
    
    const [detailInfo, setDetailInfo] = useState([])
    let body = {_id:_id}

    useEffect(()=>{
        dispatch(getDetail(body))
        .then((res=>{
            console.log('listdetailpage',res.payload[0])
            setDetailInfo(res.payload)
        }))
    },[dispatch])

    console.log()
    
    const back = ()=>{
        props.history.push('/')
    }
    

    return(
        <>
        <div>
            {detailInfo.map((data)=>
                <div>
                <h3>제목:{data.title}</h3>
                <h4>작성자:{data.userName}</h4>
                {data.contents}
                
                
                </div>
            )}
            <br/>
            <Button onClick={back}>목록으로</Button>
        </div>
        </>
    )
}

export default withRouter(ListDetailPage);