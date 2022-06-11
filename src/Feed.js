import React from 'react';

class Feed extends React.Component{

    status(props){
        return (
            <div className='card status-card my-5'>
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
            {userName: "example2", date: "6/10/2022", message: "frist!"}
        ];
        let statuses = [];
        test.map((stats,id)=>{
            statuses.push(<this.status data={stats} key={id}></this.status>)
        });
        return (
            <div className='col-lg-6'> {statuses}</div>
        );
    }
}

export default Feed;