import React from 'react'

class SideBar extends React.Component{

    friendsList(){
        
    }

    render(){
        return (
            <div className='col-lg-3 d-none d-lg-block my-5'>
                <ul class="nav flex-column nav-pills menu-sidebar text-start" data-mdb-allow-hashes="true">                   
                    <li class="nav-item">
                        <a class="nav-link" href="#section-introduction">View All Posts</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#section-basic-example">Only View Friends' Posts</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;