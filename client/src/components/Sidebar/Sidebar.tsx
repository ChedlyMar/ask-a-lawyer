import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../constants/api";
import { IState } from "../../interfaces/state";
import { deleteLawyer, logoutLawyer } from "../../redux/actions/lawyer";
import { deleteUser, logoutUser } from "../../redux/actions/user";
import { user } from "../../redux/reducers/user";

import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const lawyerId = useSelector((state: IState) => state.lawyer.lawyer?._id);
  const userId = useSelector((state: IState) => state.user.user?._id);

  const user = useSelector((state: IState) => state.user.user);
  const lawyer = useSelector((state: IState) => state.lawyer.lawyer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = () => {
    if (location.pathname[1] === "l" && lawyerId) {
      dispatch(deleteLawyer(lawyerId, navigate));
    }
    if (location.pathname[1] === "u" && userId) {
      dispatch(deleteUser(userId, navigate));
    }
  };

  const logoutHandler = () => {
    if (location.pathname[1] === "l" && lawyerId) {
      dispatch(logoutLawyer(navigate));
    }
    if (location.pathname[1] === "u" && userId) {
      dispatch(logoutUser(navigate));
    }
  };
  return (
    <div className="side-nav">
      <div className="upper-side-nav">
        <div className="avatar-container">
          {user ? (
            <img className="avatar" src={IMAGE_URL + user.image} alt="" />
          ) : (
            <img className="avatar" src={IMAGE_URL + lawyer?.image} alt="" />
          )}
        </div>
        <div className="page">
          <Link to="/user/dashboard">Dashboard</Link>
        </div>
        {userId ? (
          <div className="page">
            <Link to="/user/dashboard/lawyers">Lawyers</Link>
          </div>
        ) : null}

        <div className="page">
          {userId ? (
            <Link to="/user/dashboard/messenger">Conversations</Link>
          ) : (
            <Link to="/lawyer/dashboard/messenger">Conversations</Link>
          )}
        </div>
        <div className="page">
          <Link to="/user/dashboard/profile">Profile</Link>
        </div>
        <div className="page">
          <Link to="/user/dashboard/settings">Settings</Link>
        </div>
      </div>
      <div className="down-side-nav">
        <div className="btn">
          <button className="register" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <div className="btn">
          <Link to="/" onClick={deleteHandler}>
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
