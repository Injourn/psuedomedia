import React from "react";
import {Link} from "react-router-dom"
import { OverlayTrigger, Popover } from "react-bootstrap";
import ApiClient from "./ApiClient";


class AccountProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {displayName: '', toRelationship: '', fromRelationship: '', contentLoaded: false};
        

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
                if(!res.response.isRelated){
                    this.setState({
                        contentLoaded : true,
                        displayName : res.response.displayName
                    })
                }
                else{
                    this.setState({
                        contentLoaded : true,
                        toRelationship : res.response.toRelationshipType,
                        fromRelationship : res.response.fromRelationshipType,
                        displayName : res.response.displayName
                    });
                }
            })            
        }
    }

    handleFollow(){
        let options = {baseURL: "https://localhost:7217"};
        let apiClient = new ApiClient(options);
        apiClient.setBearerAuthorization(localStorage.getItem('jwtToken'));
        apiClient.setHeader("pm-refreshToken",localStorage.getItem('refreshToken'));
        if(this.state.toRelationship !== "FRIEND"){
            if(this.state.toRelationship !== "FOLLOW"){
                apiClient.account.follow(this.props.profileId).then(res => { 
                    if(res.success){
                        this.setState({
                            toRelationship : res.response.toRelationshipType,
                            fromRelationship : res.response.fromRelationshipType
                        })
                    }
                })
            }
            else{
                apiClient.account.unfollow(this.props.profileId).then(res => { 
                    if(res.success){
                        this.setState({
                            toRelationship : res.response.toRelationshipType,
                            fromRelationship : res.response.fromRelationshipType
                        })
                    }
                })
            }
        }
    }

    handleFriend(){
        let options = {baseURL: "https://localhost:7217"};
        let apiClient = new ApiClient(options);
        apiClient.setBearerAuthorization(localStorage.getItem('jwtToken'));
        apiClient.setHeader("pm-refreshToken",localStorage.getItem('refreshToken'));
        if(this.state.toRelationship !== "FRIEND"){
            apiClient.account.addFriend(this.props.profileId).then(res => { 
                if(res.success){
                    this.setState({
                        toRelationship : res.response.toRelationshipType,
                        fromRelationship : res.response.fromRelationshipType
                    })
                }
            })
        }
        else{
            apiClient.account.removeFriend(this.props.profileId).then(res => { 
                if(res.success){
                    this.setState({
                        toRelationship : res.response.toRelationshipType,
                        fromRelationship : res.response.fromRelationshipType
                    })
                }
            })
        }
    }

    render(){
        const isLoggedIn = localStorage.getItem('jwtToken');
        if(!this.state.contentLoaded){
            return (
                <div className="card">
                    <div className="card-body">
                        Loading
                    </div>
                </div>
            );
        } else if (isLoggedIn) {
            return (
                <div className="card">
                    <div className="card-body">
                        <Link to={"/user/" + this.props.profileId}><b className="d-flex justify-content-center">{this.state.displayName}</b> </Link> <br></br>
                        { this.state.toRelationship === "FRIEND"
                            ?   <button className="btn btn-primary disabled" onClick={this.handleFollow}>Follow</button>
                            :   (  this.state.toRelationship !== "FOLLOW" 
                                    ?   <button className="btn btn-primary" onClick={this.handleFollow}>Follow</button>
                                    :   <button className="btn btn-outline-primary" onClick={this.handleFollow}>Followed!</button>
                                    )
                        }
                        { this.state.toRelationship !== "FRIEND"
                            ?   (   this.state.fromRelationship === "FRIEND"
                                    ?   <button className="btn btn-success" onClick={this.handleFriend}>Accept Friend Request</button>
                                    :   <button className="btn btn-success" onClick={this.handleFriend}>Add Friend</button>
                                    )
                            :   ( this.state.fromRelationship === "FRIEND"
                                    ?   <button className="btn btn-outline-success" onClick={this.handleFriend}>Friends!</button>
                                    :   <button className="btn btn-outline-success" onClick={this.handleFriend}>Friend Request Sent</button>
                                )
                        }
                        
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card">
                    <div className="card-body">
                        <Link to={"/user/" + this.props.profileId}><b className="d-flex justify-content-center">{this.state.displayName}</b> </Link>
                    </div>
                </div>
            )
        }
    }
}

export default AccountProfile;