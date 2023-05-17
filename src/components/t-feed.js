import React from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import '../tfeed.css'

function Tfeed(props) {
  const [d, setData] = React.useState(null);
  const [btnstate,setBtnState] = React.useState(null);
  const [obj, setObjects] = React.useState(null)

  const fetchData = (uid) => {
    const dbRef = ref(getDatabase(), `users/${uid}/Twitter`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      
      setData(data);
    });
  };

  React.useEffect(() => {
    fetchData(props.uid);
  }, []);

  const btnchange = ()=>{
    console.log(obj)
    // push(ref(db, `users/${uid}/${"Twitter"}/${key}`), {report:1});
  }

  return (
    <div>
      <h4 className="title">Twitter Feeds</h4>
      <div>
        <div className="profiles-card1">
          <ul className="list1">
            <li className="item1">URL</li>
          </ul>
          <ui className="item1">Prediction</ui>
        </div>
      </div>
      {d &&
        Object.entries(d).map(([key, value]) => {
          const object = { key, value }; // Create an object with the same structure as the original object

          setObjects(prevObjects => [...prevObjects, object]); // Update the state by adding the object to the objects array

          return (
            <div key={key}>
              <div className="profiles-card">
                <ul className="list">
                  <li className="item">{value.url}</li>
                </ul>
                <ui className="item">{value.result}</ui>
                <button className="prof-rep" onClick={btnchange}>
                  {value.report ? 'Reported' : 'Report Incorrect Predictions'}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Tfeed;
