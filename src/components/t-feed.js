import React from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import "../tfeed.css";

import { auth, provider, db } from "../config.js";

function Tfeed(props) {
  const [d, setData] = React.useState(null);
  const [obj, setObjects] = React.useState([]);
  const [uid, setUid] = React.useState(null);

  const fetchData = (uid) => {
    const dbRef = ref(getDatabase(), `users/${uid}/Twitter`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      setData(data);
    });
  };

  React.useEffect(() => {
    fetchData(props.uid);
  });

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

  const btnchange = (key) => {
    const dbRef = ref(getDatabase(), `users/${uid}/Twitter/${key}`);
    update(dbRef, { report: 1 })
      .then(() => {
        console.log("Value updated successfully.");
      })
      .catch((error) => {
        console.log("Error updating value:", error);
      });
  };

  React.useEffect(() => {
    if (d) {
      const objectsArray = Object.entries(d).map(([key, value]) => {
        return { key, value };
      });
      setObjects(objectsArray);
    }
  }, [d]);

  return (
    <div>
      <h4 className="title">Twitter Feeds</h4>
      <div>
        <div className="profiles-card1">
          <ul className="list1">
            <li className="item1">URL</li>
          </ul>
          <ui className="item2">Prediction</ui>
        </div>
      </div>
      {obj &&
        obj.map(({ key, value }) => {
          return (
            <div key={key}>
              <div className="profiles-card">
                <ul className="list">
                  <li className="item">{value.url}</li>
                </ul>
                <ui className="item">{value.result}</ui>
                <button
                  className="prof-rep"
                  onClick={() => btnchange(key)}
                  disabled={value.report}
                >
                  {value.report ? "Reported" : "Report Incorrect Predictions"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Tfeed;
