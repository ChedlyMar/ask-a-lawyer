import { Link } from "react-router-dom";

import "./Chat.css";

const Chat = () => {
  return (
    <div className="chat">
      <section className="chat-list">
        <ul className="chat-ul">
          <li>
            <Link to={`../chat?name=chedly&room=riheb`}>Riheb</Link>
          </li>
          <li>
            <Link to={`../chat?name=chedly&room=houcem`}>Houcem</Link>
          </li>
          <li>
            <Link to={`../chat?name=chedly&room=ahmed`}>Ahmed</Link>
          </li>
        </ul>
      </section>
      <section className="chat-msg">msg</section>
    </div>
  );
};

export default Chat;
