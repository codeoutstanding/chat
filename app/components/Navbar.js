/**
 * Created by gen on 2016-10-31.
 */
import React from 'react';
import {Link} from  'react-router';

class Navbar extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return (<nav className="navbar navbar-default navbar-static-top">
            <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/stats">Stats</Link></li>
            </ul>
        </nav>);
    }
}

export default Navbar;