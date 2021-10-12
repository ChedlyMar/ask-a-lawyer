import { useState } from "react";
import { useSelector } from "react-redux";
import { ILawyer } from "../../../interfaces/lawyer";
import { IState } from "../../../interfaces/state";

const Conversation = () => {
  const selectedConv = useSelector(
    (state: IState) => state.conversation.selectedConversation
  );

  const [search, setSearch] = useState("");
  return (
    <div>
      <h2>Chats</h2>
      <div className="input">
        <input
          className="conversation-input"
          type="text"
          name="email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Conversation;
