import React from 'react';
import Feed from './Feed';
import SideBar from './SideBar';


class FriendsPage extends React.Component{

    render(){
        return (
            <div className='container'>
                <div className='row justify-content-md-center'>
                    <SideBar isLoggedIn={this.props.tokens.jwtToken} ></SideBar>
                    <Feed limited={true} displayInput={this.props.tokens.jwtToken} tokens={this.props.tokens}></Feed>
                </div>
            </div>
        );
    }
}

export default FriendsPage;