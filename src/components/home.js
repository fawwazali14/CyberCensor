import React from "react";
import "../home.css";

function Home() {
  return (
    <div>
      <div className="black-bg">
        <div className="leftbox">
          <h1 class="display-4 font-italic">
            Welcome to CyberCensor - Your One-Stop Solution for Online Security
          </h1>
          <p class="lead">
            At CyberCensor, we believe in a safer internet for all. Let us help
            you combat hate speech and create a more inclusive online community.
          </p>
        </div>
      </div>
      <div class="mb-3">
        <p class="parap">
          <span>C</span>yberbullying is a serious issue that can have harmful
          consequences for the victims. Cyberbullying refers to the use of
          electronic communication to bully, harass, or intimidate someone,
          usually anonymously. It can take many forms, such as spreading rumors,
          sharing embarrassing photos or videos, making threats, or repeatedly
          sending hurtful messages. Cyberbullying can have a significant impact
          on the mental health and well-being of the victim. It can lead to
          depression, anxiety, and low self-esteem. Victims may also experience
          physical symptoms such as headaches, stomachaches, and trouble
          sleeping. In extreme cases, cyberbullying has even been linked to
          suicide. Fortunately, there are resources available to help detect and
          prevent cyberbullying. CyberCensor is a website that provides a tool
          for detecting instances of cyberbullying on websites and social media
          platforms. By simply submitting a link to the website or social media
          post in question, CyberCensor can scan the content and identify any
          instances of cyberbullying or other harmful behavior. CyberCensor's
          technology uses advanced algorithms to analyze the text and images on
          the website or social media post, looking for patterns and keywords
          that are associated with cyberbullying. Once identified, CyberCensor
          can provide a report detailing the instances of cyberbullying and
          other harmful behavior, allowing individuals or organizations to take
          appropriate action to address the issue. In summary, cyberbullying is
          a harmful form of harassment that can have serious consequences for
          victims. CyberCensor provides a valuable tool for detecting and
          addressing instances of cyberbullying, helping to create a safer and
          more positive online environment.
        </p>
      </div>

      <div className="box2">
        <div class="card" >
          <img class="card-img-top" src={"./assets/hatesp2.jpg"} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Cyberbullying a modern form of bullying</h5>
            <p class="card-text">
            Cyberbullying or electronic aggression has already been designated as a serious public health threat ...
            </p>
            <a href="https://ijponline.biomedcentral.com/articles/10.1186/s13052-018-0446-4" class="btn btn-primary">
              Go to article
            </a>
          </div>
        </div>
    



        <div class="card" >
          <img class="card-img-top" src={"./assets/hatesp1.jpg"} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Cyberbullying: Hiding behind the screen</h5>
            <p class="card-text">
            Cyberbullying can take many forms. It can include harassment (insults or threats), spreading rumours ...
            </p>
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4276384/" class="btn btn-primary">
              Go to article
            </a>
          </div>
        </div>

        <div class="card" >
          <img class="card-img-top" src={"./assets/hatesp3.jpg"} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">How Cyberbullying Affects Children</h5>
            <p class="card-text">
            Victims of cyberbullying can experience symptoms of depression including sadness, loneliness ...
            </p>
            <a href="https://www.verywellmind.com/cyberbullying-and-depression-1066791#:~:text=How%20Cyberbullying%20Affects%20Children,and%20suicidal%20thoughts%20and%20behavior." class="btn btn-primary">
              Go to article
            </a>
          </div>
        </div>





      </div>
    </div>
  );
}

export default Home;
