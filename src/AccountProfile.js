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

    componentWillMount() {
        // this._asyncRequest = loadMyAsyncData().then(
        //   externalData => {
        //     this._asyncRequest = null;
        //     this.setState({externalData});
        //   }
        // );
    }

    renderToolTip = (props) => (
        <div>Hello <b>there</b>!</div>
    )

    handleFollow(){

    }

    handleFriend(){

    }

    render(){
        if(this.state.contentLoaded){
            return (
                <div>
                    <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={(
                            <Popover id="popover-basic" {...this.props}>
                            <Popover.Header as="h3">{this.props.displayName}</Popover.Header>
                            <Popover.Body>
                                Loading
                            </Popover.Body>
                        </Popover>)}
                    >
                        <b>{this.props.displayName}</b>
                    </OverlayTrigger>
                </div>
            );
        } else {
            return (
                <div>
                    <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={(
                        <Popover id="popover-basic" {...this.props}>
                            <Popover.Header as="h3">{this.props.displayName}</Popover.Header>
                            <Popover.Body>
                                <button type="button" class="btn btn-primary">Add as Friend </button>
                                <button type="button" class="btn btn-success">Follow </button>
                            </Popover.Body>
                        </Popover>)}
                    >
                        <b>{this.props.displayName}</b>
                    </OverlayTrigger>
                </div>
            );
        }
    }
}

export default AccountProfile;