import React from 'react';
import ApiClient from './ApiClient';
import ProfilePopover from './ProfilePopover';

function ReplyBox(props){
    const [message,setMessage] = React.useState("");

    const handleSubmit = (event) => {        
        event.preventDefault();
        let options = {baseURL: process.env.REACT_APP_API_URL};
        let apiClient = new ApiClient(options);
        apiClient.setBearerAuthorization(props.tokens.jwtToken);
        apiClient.setHeader("pm-refreshToken",props.tokens.refreshToken);
        apiClient.feed.create({"PostText":message,"ParentPostId":props.parentId}).then(res => {
            window.location.reload();
        });
    }

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input className="form-control me-2" onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Send a reply" aria-label="reply"/>
            <button className="btn btn-outline-primary" type="submit">Reply</button>
        </form>
    );
}

class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state = {postMessage:'',statuses: []}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        if(this.state.statuses.length === 0){
            let apiClient = this.getApiClient();
            if(this.props.limited){
                apiClient.feed.getFriendsPosts().then(res => {
                    this.setState({
                        statuses : res.response
                    });
                })
            }
            else if(this.props.userId){
                apiClient.feed.getUserPosts(this.props.userId).then(res => {
                    this.setState({
                        statuses : res.response
                    });
                })
            }
            else{   
                apiClient.feed.get().then(res => {
                    this.setState({
                        statuses : res.response
                    });
                })
            }
        }
    }

    getApiClient(){
        let options = {baseURL: process.env.REACT_APP_API_URL};
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
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <div className="date">
                            {new Date(props.data.createdDate).toDateString()}
                        </div>
                        {props.data.message}
                    </li>
                    {
                    props.data.replies.map((stats,id)=>{
                        return (
                            <li className='list-group-item'>
                                <div className="card-body">
                                    <b>{stats.userCreatedName}:</b> {stats.message}
                                </div>
                            </li>
                        )
                    })
                    }
                    <li className='list-group-item'>
                        <div className="card-body">
                            <ReplyBox {...props} parentId={props.data.id}/>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

    render(){
        const test = [];
        this.state.statuses.forEach((stats,id) => {
            test.push(stats)
        });

        let statuses = [];
        test.forEach((stats,id)=>{
            statuses.push(<this.status {...this.props} data={stats} key={id}></this.status>)
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