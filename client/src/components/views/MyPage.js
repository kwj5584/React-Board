import React from 'react';
import {withRouter} from 'react-router-dom'

function MyPage(props){
    const name = props.location.state.name

    return(
        <div>
            welcome {name}
        </div>
    )
}

export default withRouter(MyPage);