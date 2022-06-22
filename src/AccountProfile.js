import React from "react";
import {Link} from "react-router-dom"
import { OverlayTrigger, Popover } from "react-bootstrap";


class AccountProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {isFollowed: false, isFriend: false, contentLoaded: true, userId: ""};
        

        this.handleFollow = this.handleFollow.bind(this);
        this.handleFriend = this.handleFriend.bind(this);
    }

    // componentWillMount() {
    //     this._asyncRequest = loadMyAsyncData().then(
    //       externalData => {
    //         this._asyncRequest = null;
    //         this.setState({externalData});
    //       }
    //     );
    // }

    handleFollow(){

    }

    handleFriend(){

    }

    render(){
        if(this.state.contentLoaded){
            return (
                <div>
                    Loading
                </div>
            );
        } else {
            return (
                <div>
                    Loaded
                </div>
            );
        }
    }
}

export default AccountProfile;