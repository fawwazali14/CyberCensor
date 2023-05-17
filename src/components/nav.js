import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { auth, provider } from '../config.js'
import { signInWithPopup } from "firebase/auth";

import '../nav.css';
import Social from "./social";
import Dropdown from './dropdown.js'

export default function Nav() {
  const [value, setValue] = React.useState("");
  const [prof, setProf] = React.useState(null);
  const [v, setV] = React.useState(0);


  React.useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setValue(user.displayName)
      } 
    });
   

  })
  

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.displayName);
      setProf(data.user.uid);
      setV(data=>data+1)
    });
  }

  return (
    <nav className="nav">
      <div>
        <img src={"./assets/LLL.png"} className="logo" />
      </div>
      <div className="navlist">
        <Link to="/" className="nav-item">HOME</Link>
        <Link to="/twitter" className="nav-item">TWITTER</Link>
        <Link to="/youtube" className="nav-item">YOUTUBE</Link>
      </div>
      <div>
        {value ?
          <button className="login" onClick={() => {setProf(prof ? null : true)
              
          }
          
          }>
            {value}
          </button>
          :
          <button className="login" onClick={handleClick}>Login</button>
        }
        {  prof && value ? <Dropdown /> : null }
        
      </div>
    </nav>
  );
}
