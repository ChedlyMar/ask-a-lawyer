import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../../constants/api";
import { ILawyer } from "../../../interfaces/lawyer";
import { IState } from "../../../interfaces/state";
import { createConversation } from "../../../redux/actions/conversation";

import "./Card.css";

interface Props {
  lawyer: ILawyer;
}

const Card = ({ lawyer }: Props) => {
  // const userId = useSelector((state: IState) => state.user.user._id);
  const user = useSelector((state: IState) => state.user.user);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const askMeHandler = () => {
    if (typeof user._id == "string" && lawyer._id)
      dispatch(createConversation(user._id, lawyer._id, navigate));
  };

  return (
    <>
      {!user && <div />}
      {user && (
        <div className="lawyer-card">
          <div className="card-info">
            <div className="card-img">
              <img className="avatar" src={IMAGE_URL + lawyer.image} alt="" />
            </div>
            <div className="info">
              <label>{lawyer?.name}</label>
              <label>
                {lawyer?.address?.state}, {lawyer?.address?.city}{" "}
              </label>
            </div>
          </div>
          <div className="description">
            <p>{lawyer?.description}</p>
          </div>
          <div>
            <button onClick={askMeHandler}>Ask me!</button>
            <Link to={`${pathname}/${lawyer._id}`}>Learn more</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
