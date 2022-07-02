class ApiClient {
    constructor(options = {}) {
        this._baseURL = options.baseURL || "";
        this._headers = options.headers || { "Content-Type":'application/json' };
        
    }

    setHeader(key, value) {
        this._headers[key] = value;
        return this;
    }

    setBearerAuthorization(jwtKey){
        this._headers["Authorization"] = "Bearer " + jwtKey;
    }

    async _fetchJSON(endpoint, options = {}) {
        const res = await fetch(this._baseURL + endpoint, {
            ...options,
            headers: this._headers
        });
    
        if (!res.ok){ 
            if(this._headers["Authorization"] && res.status === 401){
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('refreshToken');
                window.location.href = "/";
            }
            return {success: false, response: await res.text()};
        }
        
        if(res.headers.get("pm-jwttoken")){
            localStorage.setItem('jwtToken',res.headers.get("pm-jwttoken"));
            localStorage.setItem('refreshToken',res.headers.get("pm-refreshtoken"));
        }
        
        if (options.parseResponse !== false && res.status !== 204)
            return {success: true,response: await res.json(),headers: res.headers};

        return {success: true,headers: res.headers};
    }

    get(endpoint, options = {}) {
        return this._fetchJSON(
          endpoint, 
          { 
            ...options, 
            method: 'GET' 
          }
        )
    }
      
    post(endpoint, body, options = {}) {
        return this._fetchJSON(
          endpoint, 
          {
            ...options, 
            body: JSON.stringify(body), 
            method: 'POST' 
          }
        )
    }

    postForm(endpoint,body,options = {}){
        return this._fetchJSON(
            endpoint, 
            {
              ...options, 
              body: body, 
              method: 'POST' 
            }
          )
    }

    put(endpoint, body, options = {}) {
        return this._fetchJSON(
          endpoint, 
          {
            ...options, 
            body: JSON.stringify(body), 
            method: 'PUT' 
          }
        )
    }
      
    delete(endpoint, options = {}) {
        return this._fetchJSON(
          endpoint, 
          {
            parseResponse: false,
            ...options, 
            method: 'DELETE' 
          }
        )
    }

    get auth() {
        return {
            login: (authInfo) => this.post("/auth/login",authInfo)
        }
    }

    get feed(){
        return{
            get: (page) => this.get("/Feed" + (page ? "?page=" + page : "")),
            create: (post) => this.post("/Feed",post),
            update: (post,id) => this.put(`/Feed/${id}`,post),
            delete: (id) => this.delete(`/Feed/${id}`),
            getUserPosts: (id,page) => this.get(`/Feed/getUserPosts/${id}` + (page ? "?page=" + page : "")),
            getMoreReplies: (postId,page) => this.get(`/Feed/getMoreReplies?postId=${postId}` + (page ? "&page=" + page : "")),
            getFriendsPosts: (page) => this.get("/Feed/getFriendsPosts" + (page ? "?page=" + page : "")),
            postRating: (id) => this.get(`/Feed/postRating?postId=${id}`),
            upvotePost: (id) => this.post(`/Feed/upvotePost?postId=${id}`),
            downvotePost: (id) => this.post(`/Feed/downvotePost?postId=${id}`),
        };
    }

    get attachment(){
        return{
            get: (id) => this.get(`/Attachment/${id}`),
            create: (postId,formBody) => this.postForm(`/Attachment?postId=${postId}`,formBody)
        };
    }

    get account(){
        return{
            get: (id) => this.get(`/Account/${id}`),
            create: (account) => this.post("/Account",account),
            update: (account) => this.put(`/Account`,account),
            delete: (id) => this.delete(`/Account`),
            getUserAccount : () => this.get("/Account/getUserAccount"),
            addFriend : (id) => this.post(`/Account/addFriend/${id}`),
            removeFriend : (id) => this.post(`/Account/removeFriend/${id}`),
            follow : (id) => this.post(`/Account/follow/${id}`),
            unfollow : (id) => this.post(`/Account/unfollow/${id}`),
            getAllFriends : () => this.get("/Account/getAllFriends")
        }
    }
}

export default ApiClient;