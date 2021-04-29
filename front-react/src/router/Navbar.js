
import React from "react";
import {Link} from "react-router-dom";
import './Navbar.css';
import { getRessources } from "../services/api_services";

export default class Navbar extends React.Component {
    
    constructor(props){
        super(props);
        this.state={categories:[]}
    }

    componentDidMount(){
        getRessources("category").then(result=>{
            this.setState({categories:result});
        });
    }

    render(){
        return (
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {this.state.categories.map((item,index)=>{
                            return <li key={index}>
                                        <Link to={"/category/"+item._id}>{item.title}</Link>
                                    </li>
                        })}

                        {this.props.isLogin?
                            <li style={{position:"absolute", right:"15px", borderLeft:"5px solid #f1f1f1"}}>
                                <Link to="/admin">Admin</Link>
                            </li>:
                            <li style={{position:"absolute", right:"15px", borderLeft:"5px solid #f1f1f1"}}>
                                <Link to="/login">Login</Link>
                            </li>
                        }
                    </ul>
                </nav>
        );
    }
}
  