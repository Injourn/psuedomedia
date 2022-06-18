import React from 'react';
import {Link as RouteLink} from 'react-router-dom';

class NavBar extends React.Component{
    Brand(){
        return(
            <RouteLink className="navbar-brand" to="/">Psuedo</RouteLink>
        );
    }

    Link(props){
        if(props.active){
            return(
                <li className="nav-item active">
                    <RouteLink className='nav-link' to={props.LinkRef}>{props.LinkName} <span className="sr-only">(current)</span></RouteLink>
                </li>
            );
        }
        else{
            return(
                <li className="nav-item">
                    <RouteLink className='nav-link' to={props.LinkRef}>{props.LinkName}</RouteLink>
                </li>
            );
        }
    }


    render(){
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <this.Brand/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search for users" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <ul className="navbar-nav me-auto">
                <this.Link LinkName="Home" LinkRef="/"></this.Link>
                <this.Link LinkName="Feed" LinkRef="/"></this.Link>                
              </ul>
              <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><RouteLink className="dropdown-item" to="/login">Login</RouteLink></li>
                            <li><RouteLink className="dropdown-item" to="/register">Register</RouteLink></li>
                        </ul>
                    </li>
                </ul>
            </div>
          </nav>
        );
    }
}

export default NavBar;