import React from 'react';
import { getRessource } from '../services/api_services';
import { useParams } from "react-router-dom";
import Post from './Post';

let parse = require('html-react-parser');

export default class CategoryPage extends React.Component {
    
    constructor(props){
        super(props)
        this.state={selectedCategory:null, posts:[]}
    }

    shouldComponentUpdate(nextProps, nextStates){
        if(nextProps.id && nextProps.id!==this.props.id){
            this.refresh(nextProps.id);
        }
        return true;
    }

    componentDidMount(){
        this.refresh(this.props.id);
    }

    refresh(id){
        getRessource("category", id).then(result=>{
            if(result._doc){
                this.setState({selectedCategory:result._doc, posts: result.posts.sort((a,b)=>b.created>a.created)});
            }
        });
    }

    render() {
      return (
        <div className="row" style={{flexDirection:"column"}}>
            {this.state.selectedCategory?
                <div style={{flexDirection:"column"}}>
                    <h2>{this.state.selectedCategory.title}</h2>
                    <img src={this.state.selectedCategory.image ? this.state.selectedCategory.image : "/logo192.png" } 
                        className={"imagePost"} alt="Logo" />
                    {parse(this.state.selectedCategory.description)}  
                </div>
                : <div style={{flexDirection:"column"}}>
                    <h2>Bad id : Category not found</h2> 
                </div>
            }
            {this.state.posts.map((item,index)=>{
                return <Post key={index}
                                data={item}
                                shorText={true} 
                                displayText={true} />
            })}
        </div>
      );
    }
}

// eslint-disable-next-line
function Page(){
    let { id } = useParams();
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
}