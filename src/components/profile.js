import React from 'react'

import '../profile.css'
import { useHistory } from 'react-router-dom';

function Profile() {
    const history = useHistory();
    
    const twitterClick = () =>{
        history.push('/twitter-feed');

    }
    const fbClick = () =>{
        history.push('/fb-feed');

    }
    const ytClick = () =>{
        history.push('/yt-feed');

    }
  return (
    <div className='parent'>
        <div className='child' onClick={twitterClick}>
            <img src={"./assets/twt.jpg"} className="img" />

            <h4>Feeds checked for Twitter </h4>
            <p>
                &rarr;Report faulty predictions<br/><br/><br/>

                &rarr;Report hate speech to social media with one click.

                

            </p>
        </div>

       

        <div className='child' onClick={ytClick}>
            <img src={"./assets/yt.png"} className="img" />

            <h4>Feeds checked for Youtube </h4>
            <p>
                &rarr;Report faulty predictions<br/><br/><br/>

                &rarr;Report hate speech to social media with one click.

                

            </p>
        </div>
    </div>

    












  )
}

export default Profile