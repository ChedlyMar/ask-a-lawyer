import { IMAGE_URL } from "../../../constants/api";
import { IMessage } from "../../../interfaces/message";

import "./Message.css";

interface Props {
  message: IMessage;
  userId: string | undefined;
  userImage: string;
  lawyerImage: string;
}

const Message = ({ message, userId, userImage, lawyerImage }: Props) => {
  return (
    <div className="messages">
      {message.sender === userId ? (
        <div className="sent-msg">
          <div className="message-alias">
            <img className="avatar" src={IMAGE_URL + userImage} alt="" />
          </div>
          <label htmlFor="">{message.text}</label>
        </div>
      ) : (
        <div className="recived-msg">
          <div className="message-alias">
            <img className="avatar" src={IMAGE_URL + lawyerImage} alt="" />
          </div>
          <label htmlFor="">{message.text}</label>
        </div>
      )}
    </div>
  );
};

export default Message;
