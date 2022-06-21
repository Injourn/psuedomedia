import React from 'react';
import Feed from './Feed';
import SideBar from './SideBar';


class MainPage extends React.Component{

    render(){
        return (
            <div className='container'>
                <div className='row justify-content-md-center'>
                    <SideBar isLoggedIn={this.props.tokens.jwtToken} ></SideBar>
                    <Feed displayInput={this.props.tokens.jwtToken} tokens={this.props.tokens}></Feed>
                </div>
            </div>
        );
    }
}

export default MainPage;