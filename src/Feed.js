import React from 'react';
import ApiClient from './ApiClient';
import ProfilePopover from './ProfilePopover';

class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state = {postMessage:'',statuses: []}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getApiClient(){
        let options = {baseURL: "https://localhost:7217"};
        let apiClient = new ApiClient(options);
        apiClient.setBearerAuthorization(this.props.tokens.jwtToken);
        apiClient.setHeader("pm-refreshToken",this.props.tokens.refreshToken);
        return apiClient;
    }

    handleSubmit(event){
        event.preventDefault();
        let apiClient = this.getApiClient();
        apiClient.feed.create({"PostText":this.state.postMessage}).then(res => {
            window.location.reload();
        });
        
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    statusCreate(props){
        return (
        <div className='card my-5'>
            <div className="card-body">
                <form onSubmit={props.handleSubmit} className="d-flex">
                    <input className="form-control me-2" type="text" placeholder="Something on your mind?" name="postMessage" onChange={props.handleChange}/>
                    <button className="btn btn-outline-success" type="submit">Update Status</button>
                </form>
            </div>
        </div>
        );
    }

    status(props){
        return (
            <div className='card text-start my-5'>
                <div className="card-header">
                    <ProfilePopover userId={props.data.userCreatedById} displayName={props.data.userCreatedName} />
                    
                </div>
                <div className="card-body">
                    <div className="createdDate">
                        {new Date(props.data.createdDate).toDateString()}
                    </div>
                    {props.data.message}
                </div>
            </div>
        );
    }

    render(){
        const test = [];
        this.state.statuses.map((stats,id) => {
            test.push(stats)
        });
        if(this.state.statuses.length === 0){
            let apiClient = this.getApiClient();
            apiClient.feed.get().then(res => {
                this.setState({
                    statuses : res.response
                });
            })
        }

        let statuses = [];
        
        test.map((stats,id)=>{
            statuses.push(<this.status data={stats} key={id}></this.status>)
        });
        return (
            <div className='col-lg-6'>
                {
                this.props.displayInput &&
                <this.statusCreate handleChange={this.handleChange} handleSubmit={this.handleSubmit}></this.statusCreate>
                }
                {statuses}
            </div>
        );
    }
}

export default Feed;