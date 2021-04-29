import React from 'react';
import { getRessources } from '../services/api_services';
import FormPost from '../components/FormPost';
import FormCategory from '../components/FormCategory';
import { disconnect } from '../store/actions/userActions';
import { connect } from 'react-redux';

class Admin extends React.Component {
    
    constructor(props){
        super(props)
        this.state={posts:[], categories:[],
            selectedCategory:null, displayFormCategory:false,
            selectedPost:null, displayFormPost:false}
    }

    componentDidMount(){
        this.refresh();
    }

    refresh(){
        getRessources("post").then(async result=>{
            if(result.length>0){
                let categories = await getRessources("category");
                this.setState({posts: result.sort((a,b)=>b.created>a.created),
                               categories: categories});
            }
        })
    }

    render() {
      return (
        <div className="row" style={{flexDirection:"column"}}>
          <h2>
            Admin
            <button style={{float:"right"}}
              onClick={()=>{this.props.disconnect();
                            window.location="/"}}>
              Logout
            </button>
          </h2>
          {this.state.displayFormPost&&
            <FormPost data={this.state.selectedPost}
                      refresh={()=>{this.refresh()}}
                      onHide={()=>{this.setState({displayFormPost:false})}}
            />
          }
          {this.state.displayFormCategory&&
            <FormCategory data={this.state.selectedCategory}
                      refresh={()=>{this.refresh()}}
                      onHide={()=>{this.setState({displayFormCategory:false})}}
            />
          }
          {!this.state.displayFormPost&& !this.state.displayFormCategory&&
            <div style={{display:"flex", flexDirection:"row"}}>
              <div style={{display:"flex", flex:1, flexDirection:"column"}}>
                <button style={{padding:10,margin:10, tjàextAlign:"left", width:"110px"}}
                          onClick={()=>this.setState({displayFormCategory:true, selectedCategory:null})}>
                      Nouvelle Categorie
                </button>
                {this.state.categories.map((item,index)=>{
                      return  <button key={index} style={{padding:10,margin:10, textAlign:"left", alignItems:"center", display:"flex"}}
                                  onClick={()=>{
                                      this.setState({selectedCategory:item, displayFormCategory:true})
                                  }}>
                              <img src={item.logo192? item.logo192: "/logo192.png"} style={{width:35, height:35, marginRight:10}}/>
                                {item.title} 
                              </button>
                })}
              </div>
              <div style={{display:"flex", flex:1, flexDirection:"column"}}>
                <button style={{padding:10,margin:10, tjàextAlign:"left", width:"110px"}}
                          onClick={()=>this.setState({displayFormPost:true, selectedPost:null})}>
                      Nouveau Post
                </button>
                {this.state.posts.map((item,index)=>{
                      return  <button key={index} style={{padding:10,margin:10, textAlign:"left", alignItems:"center", display:"flex"}}
                                  onClick={()=>{
                                      this.setState({selectedPost:item, displayFormPost:true})
                                  }}>
                              <img src={item.logo192? item.logo192: "/logo192.png"} style={{width:35, height:35, marginRight:10}}/>
                              {item.title} - {item.title_description}
                              </button>
                  })}
              </div>
            </div>
          }
        </div>
      );
    }
}

const mapDispatchToProps = dispatch => {
  return {
      disconnect: () => {dispatch(disconnect());}
  };
};
export default connect(null, mapDispatchToProps)(Admin);