import React from 'react';
import {updateRessource, createRessource, deleteRessource, getRessources } from '../services/api_services';
import RichTextEditor from 'react-rte';

export default class FormPost extends React.Component {
    constructor(props){
        super(props);
        if(props.data){
            this.state= Object.assign({image:null, categories:[], category:null},
                                       props.data)
            this.state.contenu= RichTextEditor.createValueFromString(this.state.contenu, "html");
        }else{
            this.state={title:"", title_description:"",  categories:[], category:null,
                        contenu:RichTextEditor.createEmptyValue(), image:null}
        }
    }

    componentDidMount(){
        getRessources("category").then(result=>{
            this.setState({categories:result});
        });
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.data && this.props.data!==nextProps.data){
            Object.assign(nextState, nextProps.data);
        }
        return true;
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleFileChange(event) {
        const {target} = event;
        const {files} = target;    
        if (files && files[0]) {
            var reader = new FileReader();
            reader.onload = event => {
              this.setState({image:event.target.result});
            };
            reader.readAsDataURL(files[0]);
        }
    }

    save(e){
        e.preventDefault();
        let postData = Object.assign({}, this.state);
        postData.contenu= postData.contenu.toString('html')
        if(this.props.data){
            delete postData.__v;
            delete postData._id;
            postData.updated= new Date();
            updateRessource("post", this.props.data._id, postData).then(result=>{
                alert("Enregistrement éffectué.");
                this.props.refresh();
            });
        }else{
            createRessource("post", postData).then(result=>{
                alert("Enregistrement éffectué.");
                this.props.refresh();
                this.props.onHide();
            });
        }
    }

    cancel(e){
        e.preventDefault();
        this.props.onHide();
    }

    delete(e){
        e.preventDefault();
        deleteRessource("post", this.props.data._id).then(result=>{
            alert("Suppréssion éffectué.");
            this.props.refresh();
            this.props.onHide();
        });
    }

    render() {
      return (
        <form style={{flexDirection:"row", display:"flex", padding:10, flex:1}}>
            <div style={{flexDirection:"column", display:"flex"}}>
                <img src={this.state.image ? this.state.image : "/logo192.png"}
                    alt="Logo"  className={"imagePostLittle"}/>
                <input
                    type="file"
                    accept="image/*"
                    style={{overflow:"hidden",width: "72px"}}
                    onChange={this.handleFileChange.bind(this)}
                />
            </div>
            <div style={{flexDirection:"column", display:"flex", flex:1}}>
                <select name="category" value={this.state.category ? this.state.category._id : null}  
                        onChange={this.onChange.bind(this)}>
                    <option value={null}> Aucune </option>
                    {this.state.categories.map((item, index)=>{
                        return <option key={index} value={item._id}>{item.title}</option>
                    })}
                </select>
                <input name="title" value={this.state.title}
                    placeholder="title"
                    onChange={this.onChange.bind(this)}/>
                <input name="title_description" value={this.state.title_description}
                    placeholder="title description"
                    onChange={this.onChange.bind(this)}/>
                <RichTextEditor style={{flex:1}} name="contenu"
                    onChange={(value)=>this.setState({contenu:value})}
                    value={this.state.contenu}
                />
                <div>
                    <button onClick={this.save.bind(this)}>
                        valider
                    </button>
                    {this.props.data&&
                        <button onClick={this.delete.bind(this)}>
                            supprimer
                        </button>
                    }
                    <button onClick={this.cancel.bind(this)}>
                        annuler
                    </button>
                </div>
            </div>
        </form>
      );
    }
}