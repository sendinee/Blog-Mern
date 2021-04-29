import React from 'react';
import { useParams } from "react-router-dom";
import CategoryPage from '../components/CategoryPage';

export default function Category(props) {
  let { id } = useParams();
  return (
    <div className="row" style={{flexDirection:"column"}}>
        <CategoryPage id={id}/>
    </div>
  );
}