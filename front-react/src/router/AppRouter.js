import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Admin from "../screens/Admin";
import Home from "../screens/Home";
import Post from "../screens/Post";
import Category from "../screens/Category";
import Login from "../screens/Login";
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import {BASE_URL} from '../services/api_services';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

function AppRouter(props) {
  if(!props.user){
    const socket = openSocket(BASE_URL);
    socket.on('message', (data) => {
      NotificationManager.info(data.action+" "+data.type);
    })
  }
  return (
    <Router>
        <Header/>
        <Navbar isLogin={props.user!==null}/>
        <Switch>
          {props.user&&
            <Route path="/admin" children={<Admin/>}/>
          }
          <Route path="/login" children={<Login/>} />
          <Route path="/post/:id" children={<Post/>} />
          <Route path="/category/:id" children={<Category/>} />
          <Route path="/"  children={<Home/>} />
        </Switch>
        <Footer/>
        <NotificationContainer/>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
      user: state.user.data 
  }
};

export default connect(mapStateToProps)(AppRouter);
