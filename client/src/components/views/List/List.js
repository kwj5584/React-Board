import React from 'react';
import {Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
function List(props){
    const name = props.name
    console.log('listpage:',props.name)

    const listAddPage =()=>{
        props.history.push({
            pathname: '/listAdd',
            state:{name: name}})
    }
    return(
        <>
            <h2>List Page</h2>
            <Button onClick={listAddPage}>글 작성</Button>
        </>
    )
}

export default withRouter(List)