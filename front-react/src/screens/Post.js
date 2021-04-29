import React from 'react';
import { useParams } from "react-router-dom";
import PostPage from '../components/PostPage';

export default function Post(props) {
  let { id } = useParams();
  return (
    <div className="row" style={{flexDirection:"column"}}>
        <PostPage id={id}/>
    </div>
  );
}