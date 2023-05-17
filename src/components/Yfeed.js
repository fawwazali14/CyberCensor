import React from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import '../Yfeeds.css'

const Yfeed = (props) => {
  const [d, setData] = React.useState(null);

  const fetchData = (uid) => {
    const dbRef = ref(getDatabase(), `users/${uid}/Youtube`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      
      setData(data);
    });
  };

  React.useEffect(() => {
    fetchData(props.uid);
  }, []);

  return (
    <div>
      <h4 className="title">Twitter Feeds</h4>
      <div >
            <div className="profiles-card1">
              <ul className="list1">
                <li className="item1">URL</li>
              </ul>
              <ui className="item1">Clear Comments</ui>
              <ui className="item1">Hate Comments</ui>
              
            </div>
          </div>
      
      {d &&
        Object.entries(d).map(([key, value]) => (
          <div key={key}>
            <div className="profiles-card">
              <ul className="list">
                <li className="item">{value.url}</li>
              </ul>
              <ui className="item">{value.nzero}</ui>
              <ui className="item">{value.none}</ui>
              <button className="prof-rep">Report Incorrect Prediction</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Yfeed