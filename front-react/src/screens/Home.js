import React from 'react';
import Post from '../components/Post';
import { getRessources } from '../services/api_services';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={posts:[], firstPost:null}
    }

    componentDidMount(){
        getRessources("post").then(result=>{
            if(result.length>0){
                let firstPost= Object.assign({}, result[0]);
                this.setState({posts: result.sort((a,b)=>b.created>a.created), firstPost: firstPost});
            }
        })
    }

    render() {
      return (
        <div className="row">
            <div className="leftcolumn">
                {this.state.posts.map((item,index)=>{
                    return <Post key={index}
                                 data={item}
                                 shorText={true} 
                                 displayText={true} />
                })}
            </div>
            <div className="rightcolumn">
                {this.state.firstPost&&
                    <Post data={this.state.firstPost}
                          shorText={false} 
                          displayText={false} />
                }
                <div className="card">
                    <h3>Popular Post</h3>
                    {this.state.posts.slice(0, 3).map((item,index)=>{
                        return <Post key={index}
                                     data={item}
                                     shorText={false} 
                                     displayText={false} />
                    })}
                </div>
                <div className="card">
                <h3>Follow Me</h3>
                <i class="fa fa-heart"></i>
                </div>
            </div>
        </div>
      );
    }
}