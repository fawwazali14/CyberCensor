import React from 'react'
import { useHistory } from 'react-router-dom';
import '../dropdown.css'
import { auth, provider } from '../config.js'


function Dropdown() {
    const history = useHistory(); // get the history object from react-router-dom

  const handleProfileClick = () => {
    history.push('/profiles'); // navigate to /profiles page on click of Profile item
  };

  const handleLogoutClick = () => {
    console.log(auth.currentUser.uid)
    auth.signOut(); 
    history.push('/');
    window.location.reload();
  };
  return (
    <div className='x'>
        
        <ul className='list'>
            <li className='item' onClick={handleProfileClick}>Profile</li>
            <li className='item' onClick={handleLogoutClick}>Logout</li>
        </ul>
        
    </div>
  )
}

export default Dropdown