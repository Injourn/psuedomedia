import React from 'react'
import ApiClient from './ApiClient';

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
                <a className="nav-link side-bar-mini" href={"/user/" + friends.userId}>{friends.displayName}</a>
            </li>)
        })
        return (
            <div className='col-lg-3 d-none d-lg-block my-5' id="sticky-sidebar">
                <div className='sticky-top'>
                    <ul className="nav flex-column nav-pills menu-sidebar text-start" data-mdb-allow-hashes="true">                   
                        <li className="nav-item">
                            <a className="nav-link" href="#section-introduction">View All Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#section-basic-example">Only View Friends' Posts</a>
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