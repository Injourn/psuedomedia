import React from "react";
import {Link} from "react-router-dom"
import { OverlayTrigger, Popover } from "react-bootstrap";
import ApiClient from "./ApiClient";


class AccountProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {toRelationship: '', fromRelationship: '', contentLoaded: false};
        

        this.handleFollow = this.handleFollow.bind(this);
        this.handleFriend = this.handleFriend.bind(this);
    }

    componentDidMount() {
        if(!this.state.contentLoaded){
            let options = {baseURL: "https://localhost:7217"};
            let apiClient = new ApiClient(options);
            apiClient.setBearerAuthorization(localStorage.getItem('jwtToken'));
            apiClient.setHeader("pm-refreshToken",localStorage.getItem('refreshToken'));
            apiClient.account.get(this.props.profileId).then(res => {
                if(res.isRelated){
                    this.setState({
                        contentLoaded : true
                    })
                }
                else{
                    this.setState({
                        contentLoaded : true,
                        toRelationship : res.toRelationshipType,
                        fromRelationship : res.fromRelationshipType
                    });
                }
            })            
        }
    }

    handleFollow(){

    }

    handleFriend(){

    }

    render(){
        if(!this.state.contentLoaded){
            return (
                <div className="card">
                    <div className="card-body">
                        Loading
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card">
                    <div className="card-body">
                        <Link to="#"><b className="d-flex justify-content-center">{this.props.displayName}</b> </Link> <br></br>
                        <button className="btn btn-primary" onClick={this.handleFollow}>Follow</button>
                        <button className="btn btn-success" onClick={this.handleFriend}>Add Freind</button>
                    </div>
                </div>
            );
        }
    }
}

export default AccountProfile;