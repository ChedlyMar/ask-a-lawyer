import { useEffect } from "react";
import { useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:8900");

const About = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendHandler = (e: any) => {
    e.preventDefault();
    // socket.emit("chat", { message });
    setMessage("");
  };

  // socket.on("chat", (payload) => {
  //   setChat([...chat, payload.msg]);
  //   console.log(payload);
  // });
  // useEffect(() => {});

  return (
    <div>
      {chat.map((msg) => {
        <h2>{msg}</h2>;
      })}
      <form onSubmit={sendHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default About;
