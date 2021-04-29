import React from 'react';
let parse = require('html-react-parser');

export default function Post(props) {
    return (
        <a className="card" href={`/post/${props.data._id}`}>
            <h2>{props.data.title}</h2>
            <h5>{props.data.title_description}</h5>
            <img src={props.data.image ? props.data.image : "/logo192.png" } 
                 className={props.displayText ? "imagePost" : "imagePostLittle"} alt="Logo" />
            {props.displayText&&
                <div style={{overflow:"hidden", maxHeight:155, textOverflow:"ellipse"}}>
                    {parse(props.data.contenu)}
                </div>
            }   
        </a>
    );
}
  