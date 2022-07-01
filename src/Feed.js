import React from 'react';
import ApiClient from './ApiClient';
import Status from './Status';

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

    getApiClient(form){
        let options = {baseURL: process.env.REACT_APP_API_URL};
        if(form){
            options.headers = { "Content-Type":'multipart/form-data' }
        }
        let apiClient = new ApiClient(options);
        apiClient.setBearerAuthorization(this.props.tokens.jwtToken);
        apiClient.setHeader("pm-refreshToken",this.props.tokens.refreshToken);
        return apiClient;
    }

    handleSubmit(event){
        event.preventDefault();
        let apiClient = this.getApiClient();
        apiClient.feed.create({"PostText":this.state.postMessage}).then(res => {
            if(this.state.file){
                let formApiClient = this.getApiClient(true);
                formApiClient.setBearerAuthorization(this.props.tokens.jwtToken);
                formApiClient.setHeader("pm-refreshToken",this.props.tokens.refreshToken);
                let formData = new FormData();
                formData.append('File',this.state.file);
                formApiClient.attachment.create(res.response.id,formData).then(res => {
                    window.location.reload();
                })
            }
            else {
                window.location.reload();
            }
        });   
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.type !== "file" ? event.target.value : event.target.files[0];
        console.log(name + ":" + value);

        this.setState({
            [name]: value
        })
    }

    statusCreate(props){
        return (
        <div className='card my-5'>
            <div className="card-body">
                <form onSubmit={props.handleSubmit} >
                    <div className="d-flex">
                        <input className="form-control me-2" type="text" placeholder="Something on your mind?" name="postMessage" onChange={props.handleChange}/>
                        <button className="btn btn-outline-success" type="submit">Update Status</button>
                    </div>
                    <input className="form-control form-control-sm" type="file" name="file" onChange={props.handleChange} />
                </form>
            </div>
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
            statuses.push(<Status {...this.props} data={stats} key={id}></Status>)
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