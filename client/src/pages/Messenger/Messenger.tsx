import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import io from "socket.io-client";

import {
  getConversation,
  selectedConversation,
} from "../../redux/actions/conversation";
import { getLawyer } from "../../redux/actions/lawyer";
import {
  AddMessage,
  getMessage,
  recivedMessage,
} from "../../redux/actions/message";
import { IState } from "../../interfaces/state";
import { ILawyer } from "../../interfaces/lawyer";

import Message from "./Message/Message";

import "./Messenger.css";
import { IMAGE_URL } from "../../constants/api";

import { io, Socket } from "socket.io-client";

const Messenger = () => {
  const [newMessage, setNewMessage] = useState("");
  const [lawyerImage, setLawyerImage] = useState("");

  // const userId = useSelector((state: IState) => state.user.user._id);
  const user = useSelector((state: IState) => state.user.user);

  // get Convesation List
  useEffect(() => {
    if (user?._id) dispatch(getConversation(user._id));
  }, [user]);
  const conversationList = useSelector(
    (state: IState) => state.conversation.conversation
  );

  // get My Lawyer List
  useEffect(() => {
    if (conversationList.length && !lawyerList.length)
      conversationList?.forEach((conv) => dispatch(getLawyer(conv.lawyerId)));
  }, [conversationList]);
  const lawyerList: ILawyer[] = useSelector(
    (state: IState) => state.lawyer.myLawyer
  );

  const selectedConversationId = useSelector(
    (state: IState) => state.conversation.selectedConversation
  );
  const messageList = useSelector((state: IState) => state.message);

  const dispatch = useDispatch();

  const convHandler = (lawyerId: string | undefined, lawyerImg: string) => {
    setLawyerImage(lawyerImg);
    const conv = conversationList.find((c) => c.lawyerId === lawyerId);
    setLawyerImage(lawyerImg);
    if (conv?._id) {
      dispatch(selectedConversation(conv._id));
      dispatch(getMessage(conv._id));
    }
  };

  // Socket.io
  const socketRef = useRef<Socket>();
  const { current: socket } = socketRef;

  useEffect(() => {
    // connect socket.io
    socketRef.current = io("http://localhost:5001");
    //recive message from socket
    socket?.on("recive-message", (msg) => {
      console.log(msg);
      if (msg.sender !== user._id) dispatch(recivedMessage(msg));
    });
    return function cleanup() {
      socket?.disconnect();
    };
  }, [messageList.length]);

  // (recivedMessage(msg));

  const sendMsgHandler = async (e: any) => {
    e.preventDefault();
    let socketMessage;
    if (typeof user._id == "string") {
      socketMessage = await dispatch(
        AddMessage(selectedConversationId, user._id, newMessage)
      );
      // sent message to socket
      socket?.emit("send-message", socketMessage);
      console.log(socketMessage);

      setNewMessage("");
    }
  };

  return (
    <div className="messenger">
      <div className="conversation-list">
        {lawyerList?.map((lawyer) => (
          <div
            className={`${
              conversationList.find((c) => c.lawyerId === lawyer._id)?._id ===
              selectedConversationId
                ? "selecteConv"
                : "conversation"
            }`}
            onClick={() => convHandler(lawyer._id, lawyer.image)}
          >
            <div className="messenger-alias">
              <img className="avatar" src={IMAGE_URL + lawyer.image} alt="" />
            </div>
            <label>{lawyer?.name}</label>
          </div>
        ))}
      </div>
      <div className="conversation-message">
        <div className="scroll-msg">
          <div className="message-flow">
            {messageList?.map((message) => (
              <Message
                message={message}
                userId={user._id}
                userImage={user.image}
                lawyerImage={lawyerImage}
              />
            ))}
          </div>
        </div>
        <div className="add-msg">
          <textarea
            value={newMessage}
            rows={2}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="btn">
            <button onClick={sendMsgHandler}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
