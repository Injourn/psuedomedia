import React from 'react'
import ApiClient from './ApiClient';
import {Link} from 'react-router-dom'

class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {contentLoaded: false,friends : []}
    }

    componentDidMount() {
        if(!this.state.contentLoaded){
            let options = {baseURL: "https://localhost:7217"};
            let apiClient = new ApiClient(options);
            apiClient.setBearerAuthorization(localStorage.getItem('jwtToken'));
            apiClient.setHeader("pm-refreshToken",localStorage.getItem('refreshToken'));
            apiClient.account.getAllFriends().then(res => {
                this.setState({
                    contentLoaded : true,
                    friends : res.response
                });
            })
        }
    }

    render(){
        console.log(this.state.friends);
        const friendsList = [];
        this.state.friends.map((friends,id) => {
            friendsList.push(<li className="nav-item">
                <Link className="nav-link side-bar-mini" to={"/user/" + friends.userId}>{friends.displayName}</Link>
            </li>)
        })
        return (
            <div className='col-lg-3 d-none d-lg-block my-5' id="sticky-sidebar">
                <div className='sticky-top'>
                    <ul className="nav flex-column nav-pills menu-sidebar text-start" data-mdb-allow-hashes="true">                   
                        <li className="nav-item">
                            <Link className="nav-link" to="/">View All Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Friends">Only View Friends' Posts</Link>
                            <ul className='nav flex-column nav-pills menu-sidebar text-start'>
                                {friendsList}                                
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SideBar;