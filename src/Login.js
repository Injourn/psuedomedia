import React from 'react';
import ApiClient from './ApiClient';

class LoginScreen extends React.Component{
    constructor(props){
        super (props);
        this.state = {username: '', password: '',error: false,errorMsg:''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }


    handleSubmit(event){
        event.preventDefault();
        let options = {baseURL:"https://localhost:7217"};
        let apiClient = new ApiClient(options);
        apiClient.auth.login({"Username":this.state.username,"Password":this.state.password}).then(res =>{
            console.log(res);
            if(!res.success){
                res.response.then(text => {
                    this.setState({
                        error: true,
                        errorMsg: text
                    })
                });
            }
            else {
                res.response.then(json => {
                    console.log(json);
                    this.props.setTokens(json);
                });
                window.location = "/";
            }
        });
    }

    render(){
        return (
            <div className="my-auto account-card">
                <div className="col-md-6 col-12 card mx-auto">
                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body">
                        {this.state.error && 
                            <div>
                                Error: {this.state.errorMsg}
                            </div>
                        }
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input 
                                    type="username"
                                    name="username" 
                                    class="form-control" 
                                    id="username" 
                                    onChange={this.handleChange} 
                                    value={this.state.username} />
                            </div>
                            <div className="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input 
                                    type="password"
                                    name="password" 
                                    class="form-control" 
                                    id="password" 
                                    onChange={this.handleChange} 
                                    value={this.state.password} />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginScreen;