import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from './Feed';
import SideBar from './SideBar';
import UserSideBar from './UserSideBar';

class UserPage extends React.Component{

    render(){                
        return (
            <div className='container'>
                <div className='row justify-content-md-center'>
                    <UserSideBar userId={this.props.params.userId} ></UserSideBar>
                    <Feed userId={this.props.params.userId} displayInput={this.props.tokens.jwtToken} tokens={this.props.tokens}></Feed>
                </div>
            </div>
        );
    }
}

function withParams(Component){
    return props => <Component {...props} params={useParams()} />
}

export default withParams(UserPage);