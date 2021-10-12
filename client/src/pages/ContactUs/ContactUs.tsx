import axios from "axios";
import { useState } from "react";
import "./ContactUs.css";
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form>
      <div className="input-group">
        <div className="label">
          <label>Name * </label>
        </div>
        <div className="input">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="input-group">
        <div className="label">
          <label>Email * </label>
        </div>
        <div className="input">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="input-group">
        <div className="label">
          <label>Message * </label>
        </div>
        <div className="input">
          <textarea
            rows={6}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="btn-groupe">
        <button className="submit">Send</button>
      </div>
    </form>
  );
};

export default ContactUs;
