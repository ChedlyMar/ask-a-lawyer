import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import "./Home.css";

const Home: FC = () => {
  return (
    <div>
      <section>
        <h1 className="first">
          LAPT <span>The First</span>
        </h1>
        <h1> Leagal Advisor Platform </h1>
        <h2>in Tunisia</h2>
        <h5>Get your Leagal advise fast, and save time</h5>
        <div className="btns">
          <Link to="signup/user">
            <Button>Start now</Button>
          </Link>
          <Button>Do the video tour</Button>
        </div>
      </section>
      <section className="landing-page">
        <img className="chat" src="./test.png" alt="" />
      </section>
      <section>
        <h2>What makes LAPT a powerful yet simple tool</h2>
        <h2> for leagal advise?</h2>
        <div className="cards">
          <div className="card">
            <h3> Powerful communication</h3>
            <p>With your own website, e-mail and SMS, news and events</p>
          </div>
          <div className="card">
            <h3>Powerful communication</h3>
            <p>With your own website, e-mail and SMS, news and events</p>
          </div>
          <div className="card">
            <h3>Powerful communication</h3>
            <p>With your own website, e-mail and SMS, news and events</p>
          </div>
        </div>
      </section>
      <section>
        <h1>Partners and contributors</h1>
        <div className="partners-logos">
          <img className="partners-logo" src="./gomycode.png" alt="" />
          <img className="partners-logo" src="./gomycode.png" alt="" />
          <img className="partners-logo" src="./gomycode.png" alt="" />
          <img className="partners-logo" src="./gomycode.png" alt="" />
          <img className="partners-logo" src="./gomycode.png" alt="" />
          <img className="partners-logo" src="./gomycode.png" alt="" />
          <img className="partners-logo" src="./gomycode.png" alt="" />
        </div>
        <Link to="/contact">
          <Button>Become a partner</Button>
        </Link>
      </section>
      <section>
        <h1>What people say about LAPT</h1>
        <div className="testemonials">
          <div className="testemonial">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
              impedit sint cum ut doloremque numquam illum consectetur! Ducimus
              assumenda rem unde sit repellat neque distinctio amet, atque nobis
              quibusdam ab.
            </p>
            <div className="profile">
              <div className="img-profile">
                <img src="./profile.png" alt="" />
              </div>
              <div className="info-profile">
                <h4>name</h4>
                <p>CEO, Gomycode</p>
              </div>
            </div>
          </div>
          <div className="testemonial">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
              impedit sint cum ut doloremque numquam illum consectetur! Ducimus
              assumenda rem unde sit repellat neque distinctio amet, atque nobis
              quibusdam ab.
            </p>
            <div className="profile">
              <div className="img-profile">
                <img src="./profile.png" alt="" />
              </div>
              <div className="info-profile">
                <h4>name</h4>
                <p>CEO, Gomycode</p>
              </div>
            </div>
          </div>
          <div className="testemonial">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
              impedit sint cum ut doloremque numquam illum consectetur! Ducimus
              assumenda rem unde sit repellat neque distinctio amet, atque nobis
              quibusdam ab.
            </p>
            <div className="profile">
              <div className="img-profile">
                <img src="./profile.png" alt="" />
              </div>
              <div className="info-profile">
                <h4>name</h4>
                <p>CEO, Gomycode</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
