import React from 'react';

class Feed extends React.Component{

    statusCreate(){
        return (
        <div className='card my-5'>
            <div className="card-body">
                <form className="d-flex">
                    <input className="form-control me-2" type="text" placeholder="Something on your mind?"/>
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
                    {props.data.userName}
                </div>
                <div className="card-body">
                    <div className="date">
                        {props.data.date}
                    </div>
                    {props.data.message}
                </div>
            </div>
        );
    }

    render(){
        const test = [
            {userName: "example1", date: "6/10/2022", message: "I love making posts!"},
            {userName: "example2", date: "6/10/2022", message: "frist!"},
            {userName: "example3", date: "6/10/2022", message: "no you're not!"},
            {userName: "example2", date: "6/10/2022", message: "I wish there was a reply button..."}
        ];
        let statuses = [];
        test.map((stats,id)=>{
            statuses.push(<this.status data={stats} key={id}></this.status>)
        });
        return (
            <div className='col-lg-6'>
                <this.statusCreate></this.statusCreate>
                {statuses}
            </div>
        );
    }
}

export default Feed;