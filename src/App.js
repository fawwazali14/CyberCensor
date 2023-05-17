import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./components/nav.js";
import Profile from "./components/profile";
import React from "react";
import { auth, provider,db } from './config.js'
import Tfeed from "./components/t-feed";
import Ffeed from "./components/Ffeed";
import Yfeed from "./components/Yfeed";

import Social from "./components/social";
import Home from "./components/home";

function App() {
  const [uid, setUid] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <Router>
      <Nav />
      <div className="container">
      
        <Switch>
          
          <Route path="/twitter" component={Social} />
          <Route path="/youtube" component={Social}/>
          <Route path="/profiles" component={Profile} />
          <Route path="/twitter-feed" render={(props) => <Tfeed uid={uid} />} />
          <Route path="/yt-feed" render={(props)=><Yfeed uid={uid}/>}/>
          <Route path="/" component={Home} />
          
          
         
        

          
          <Route path="/youtube" component={Social} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
