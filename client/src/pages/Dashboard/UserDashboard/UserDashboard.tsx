import { useSelector } from "react-redux";
import { IMAGE_URL } from "../../../constants/api";
import { IState } from "../../../interfaces/state";

import "./UserDashboard.css";

const UserDashboard = () => {
  const user = useSelector((state: IState) => state.user.user);
  const lawyer = useSelector((state: IState) => state.lawyer.lawyer);

  return (
    <div className="db-container">
      {user ? (
        <div className="">
          <img src={IMAGE_URL + user.image} alt="" />
          <h2>Hello, {user.name}</h2>
          <h3>You made n consultation</h3>
          <h3>You spent n$ in the last year! </h3>
        </div>
      ) : lawyer ? (
        <div>
          <img src={IMAGE_URL + lawyer.image} alt="" />
          <h2>Hello, {lawyer.name}</h2>
          <h3>You scceed to reach n consultation</h3>
          <h3>Congratulation! you gain n$ in the last year! </h3>
        </div>
      ) : null}
    </div>
  );
};

export default UserDashboard;
