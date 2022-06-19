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
    
        if (!res.ok) return {success: false, response: res.text()};
        
        if (options.parseResponse !== false && res.status !== 204)
            return {success: true,response: res.json(),headers: res.headers};

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
            get: () => this.get("/Feed"),
            create: (post) => this.post("/Feed",post),
            update: (post) => this.put(`/Feed/${post.id}`,post),
            delete: (id) => this.delete(`/Feed/${id}`)
        };
    }

    get account(){
        return{
            get: (id) => this.get(`Account/${id}`),
            create: (account) => this.post("/Account",account),
            update: (account) => this.put(`/Account`,account),
            delete: (id) => this.delete(`/Account`),
            addFriend : (id) => this.post(`/Account/addFriend/${id}`),
            removeFriend : (id) => this.post(`/Account/removeFriend/${id}`),
            follow : (id) => this.post(`/Account/follow/${id}`),
            unfollow : (id) => this.post(`/Account/addFriend/${id}`)
        }
    }
}

export default ApiClient;