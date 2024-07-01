import React from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as Ticon } from "../twitter.svg";
import { ReactComponent as Ficon } from "../facebook.svg";
import { ReactComponent as Yicon } from "../youtube.svg";
import "../social.css";
import { auth, provider, db } from "../config.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Dropdown } from "react-bootstrap";
import { getDatabase, ref, set, push } from "firebase/database";

const Social = () => {
  let soc;

  const [uid, setUid] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [id, setID] = React.useState("");
  const [YT, setYT] = React.useState(false);
  const [YTfinald, setYTfinaldata] = React.useState(null);
  const [YTfinala, setYTfinalarrdata] = React.useState(null);
  const [YTfinalc, setYTfinalcdata] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState(
    "Description and Comments"
  );
  const p = {
    zero: 0,
    one: 0,
  };
  const [Ydatadec, setYdatadec] = React.useState(null);
  const [Ydatacom, setYdatacom] = React.useState(p);

  const [data, setData] = React.useState({});

  async function fetchData(x) {
    try {
      const response = await fetch("https://cyberapi-nrnd.onrender.com/dataa", {
        method: "POST",

        body: JSON.stringify(x),
      });
      const data = await response.json();
      console.log(data);
      if(soc==="Twitter"){
        setData(removeUrls(data.text));
      }
      setYT(true);
      setYTfinaldata(JSON.stringify(data.Description));
      setYTfinalarrdata(JSON.stringify(data.Comments));
      setYTfinalcdata(JSON.stringify(data.Com_count));
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function ML(x) {
    try {
      const response = await fetch("https://cyberapi-nrnd.onrender.com/ml", {
        method: "POST",

        body: JSON.stringify(x),
      });
      const data = await response.json();

      if (soc === "Twitter") {
        push(ref(db, `users/${uid}/${soc}`), { url: url, result: data.result,report:0 });

        console.log(data.result)
        if(data.result==="0"){
          setData("The given text is flagged as clear speech")
        }
        else if(data.result==="1"){
          setData("The given text is flagged as hate speech")
        }
      } else if (soc === "Youtube") {
        push(ref(db, `users/${uid}/${soc}`), { url: url, nzero: data.czero, none : data.cone, report: 0 });
        setYdatadec(data.desp);
        const p = {
          zero: data.czero,
          one: data.cone,
        };
        setYdatacom(p);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const Push = () => {
    if (soc === "Twitter") {
      const tweetid = url.substring(url.lastIndexOf("/") + 1);
      const parameter = {
        platform: soc,
        id: tweetid,
      };
      fetchData(parameter);
      setID(tweetid);
    } else if (soc === "Facebook") {
    } else if (soc === "Youtube") {
      const unqid = url.split("v=")[1];

      setID(unqid);
    }
  };

  const typehandler = () => {
    const select = document.getElementById("membership");
    const selectedValue = select.value;
    const parameter = {
      platform: soc,
      id: id,
      type: selectedValue,
    };
    console.log(parameter);
    fetchData(parameter);
  };

  React.useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  function removeUrls(str) {
    return str.replace(/http\S+/g, '');
  }

  const detectML = () => {
    setIsLoading(false);
    
    if (soc === "Twitter") {
      const par = {
        text: data,
        platform: soc,
      };
      ML(par);
    } else if (soc === "Youtube") {
      const param = {
        Desp: YTfinald,
        Coms: YTfinala,
        platform: soc,
      };
      ML(param);
    }
  };

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

  let MyIcon = null;
  const location = useLocation();
  const currentPath = location.pathname;
  if (currentPath === "/twitter") {
    soc = "Twitter";
    MyIcon = Ticon;
  } else if (currentPath === "/facebook") {
    soc = "Facebook";
    MyIcon = Ficon;
  } else if (currentPath === "/youtube") {
    soc = "Youtube";
    MyIcon = Yicon;
  }

  return (
    <div>
      <div className="social">
        <MyIcon className="icon" />
        <div className="text">
          <h5>Detect hate speech with a link</h5>
          <p className="info">
            {" "}
            {"\u2713"} Create a Account.
            <br />
            {"\u2713"} Copy the link.
            <br />
            {"\u2713"} Check for hate speech by pasting the link.
            <br />
            {"\u2713"} Help to improve ML model by improving data set by
            reporting faulty predictions.
          </p>
        </div>
      </div>

      {uid && (
        <div class="container">
          <h3 className="subheading">Enter the URL to detect hate speech</h3>

          <form class="form">
            <input
              class="f1"
              type="text"
              name="url"
              placeholder="URL"
              fdprocessedid="pt80xo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            {soc === "Twitter" ? (
              <button
                onClick={Push}
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Request
              </button>
            ) : null}

            {soc === "Youtube" ? (
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#myid"
                onClick={Push}
              >
                Request
              </button>
            ) : null}
          </form>
        </div>
      )}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {soc} Retrived.
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isLoading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                <p>{removeUrls(JSON.stringify(data))}</p>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={detectML}>
                Detect hate speech
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="em"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {soc} Prediction.
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isLoading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                <div>
                  <p>
                    {Ydatadec === 1
                      ? "The Description of the video flagged as Hate speech"
                      : " The Description of the video flagged as clean speech"}
                  </p>
                  <p>
                    {Ydatacom.zero +
                      " number of comments are flagged as clean and " +
                      Ydatacom.one +
                      " is classified at inappropriate speech"}
                  </p>
                </div>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="myid">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title ">Retreving Youtube Content</h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <div className="xbody">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe
                    width="450px"
                    height="300px"
                    class="embed-responsive-item"
                    src={"https://www.youtube.com/embed/" + id}
                    allowfullscreen
                  ></iframe>
                </div>
                <div className="ppp">
                  <div className="p2">
                    <h5 for="membership" className="fonts">
                      Choose  where to detect hate speech:
                    </h5>
                    <select
                      name="membership"
                      id="membership"
                      className="btn btn-secondary dropdown-toggle"
                      onChange={handleSelectChange}
                    >
                      <option value="Description">Description</option>
                      <option value="Comments">Comments</option>
                      <option value="Description and Comments" selected>
                        Description and Comments
                      </option>
                    </select>
                    <input
                      class="btn btn-primary"
                      type="submit"
                      value="Submit"
                      onClick={typehandler}
                    ></input>
                  </div>
                </div>
              </div>

              {selectedValue === "Description" ||
              selectedValue === "Description and Comments" ? (
                <div className="main-box">
                  <h2 className="desh2">Description Check</h2>
                  <p>{YTfinald}</p>
                </div>
              ) : null}

              {selectedValue === "Comments" ||
              selectedValue === "Description and Comments" ? (
                <div>
                  <h2 className="desh2">Comments Retrived</h2>
                  <p>
                    {"There are a total of " + YTfinalc + " comments retrived."}
                  </p>
                </div>
              ) : null}

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#em"
                  onClick={detectML}
                >
                  Detect hate speech
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
