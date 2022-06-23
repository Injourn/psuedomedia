import React from 'react'
import AccountProfile from './AccountProfile';
import ApiClient from './ApiClient';

class UserSideBar extends React.Component{
    
    render(){
        return (
            <div className='col-lg-3 d-none d-lg-block my-5' id="sticky-sidebar">
                <AccountProfile profileId={this.props.userId}/>
            </div>
        )
    }
}

export default UserSideBar;