
function LoginScreen(){
    return (
        <div className="my-auto account-card">
            <div className="col-md-6 col-12 card mx-auto">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <form>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="username" class="form-control" id="username"/>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;