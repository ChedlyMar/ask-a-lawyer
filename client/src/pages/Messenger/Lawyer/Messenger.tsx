import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../../../constants/api";
import { IState } from "../../../interfaces/state";
import { IUser } from "../../../interfaces/user";
import {
  getLawyerConversation,
  selectedConversation,
} from "../../../redux/actions/conversation";
import {
  AddMessage,
  getMessage,
  recivedMessage,
} from "../../../redux/actions/message";
import { getUserById } from "../../../redux/actions/user";
import { user } from "../../../redux/reducers/user";
import Message from "../Message/Message";

import "../Messenger.css";

import { io, Socket } from "socket.io-client";

const Messenger = () => {
  const [newMessage, setNewMessage] = useState("");
  const [userImage, setUserImage] = useState("");
  const dispatch = useDispatch();

  const lawyerId = useSelector((state: IState) => state.lawyer.lawyer?._id);
  const lawyerImage = useSelector(
    (state: IState) => state.lawyer.lawyer?.image
  );

  const messageList = useSelector((state: IState) => state.message);
  useEffect(() => {
    if (lawyerId) dispatch(getLawyerConversation(lawyerId));
  }, [lawyerId]);
  const selectedConversationId = useSelector(
    (state: IState) => state.conversation.selectedConversation
  );

  const conversationList = useSelector(
    (state: IState) => state.conversation.conversation
  );
  useEffect(() => {
    if (conversationList.length && !userList.length)
      conversationList?.forEach((conv) => dispatch(getUserById(conv.userId)));
  }, [conversationList]);
  const userList: IUser[] = useSelector((state: IState) => state.user.myUser);

  const convHandler = (userId: string | undefined, userImage: string) => {
    setUserImage(userImage);
    const conv = conversationList.find((c) => c.userId === userId);
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
      if (msg.sender !== lawyerId) dispatch(recivedMessage(msg));
    });
    return function cleanup() {
      socket?.disconnect();
    };
  }, [messageList.length]);

  const sendMsgHandler = async (e: any) => {
    e.preventDefault();
    let socketMessage;
    if (typeof lawyerId == "string") {
      socketMessage = await dispatch(
        AddMessage(selectedConversationId, lawyerId, newMessage)
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
        {userList?.map((user) => (
          <div
            className={`${
              conversationList.find((c) => c.lawyerId === user._id)?._id ===
              selectedConversationId
                ? "selecteConv"
                : "conversation"
            }`}
            onClick={() => convHandler(user._id, user.image)}
          >
            <div className="messenger-alias">
              <img src={IMAGE_URL + user.image} alt="" />
            </div>
            <label htmlFor="">{user.name}</label>
          </div>
        ))}
      </div>
      <div className="conversation-message">
        <div className="scroll-msg">
          <div className="message-flow">
            {messageList?.map((message) => (
              <Message
                message={message}
                userId={lawyerId}
                userImage={lawyerImage}
                lawyerImage={userImage}
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
