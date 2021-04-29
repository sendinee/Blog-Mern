import React from 'react';
import {updateRessource, createRessource, deleteRessource } from '../services/api_services';
import RichTextEditor from 'react-rte';

export default class FormCategory extends React.Component {
    constructor(props){
        super(props);
        if(props.data){
            this.state= Object.assign({image:null},props.data)
            this.state.description= RichTextEditor.createValueFromString(this.state.description, "html");
        }else{
            this.state={title:"",
                        description:RichTextEditor.createEmptyValue(), image:null}
        }
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
        let categoryData = Object.assign({}, this.state);
        categoryData.description= categoryData.description.toString('html')
        if(this.props.data){
            delete categoryData.__v;
            delete categoryData._id;
            categoryData.updated= new Date();
            updateRessource("category", this.props.data._id, categoryData).then(result=>{
                alert("Enregistrement éffectué.");
                this.props.refresh();
            });
        }else{
            createRessource("category", categoryData).then(result=>{
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
        deleteRessource("category", this.props.data._id).then(result=>{
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
                <input name="title" value={this.state.title}
                    placeholder="title"
                    onChange={this.onChange.bind(this)}/>
                <RichTextEditor style={{flex:1}} name="description"
                    onChange={(value)=>this.setState({description:value})}
                    value={this.state.description}
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