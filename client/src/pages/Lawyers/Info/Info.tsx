import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IState } from "../../../interfaces/state";

import "./info.css";
import { IMAGE_URL } from "../../../constants/api";
import { getAllLawyers } from "../../../redux/actions/lawyer";

const Info = () => {
  const { lawyerId } = useParams();
  const user = useSelector((state: IState) => state.user.user);
  const lawyer = useSelector((state: IState) =>
    state.lawyer.allLawyer.find((lawyer) => lawyer._id === lawyerId)
  );
  const dispatch = useDispatch();
  if (!lawyer) dispatch(getAllLawyers());

  return (
    <>
      {!user && !lawyer && <div />}
      {user && lawyer && (
        <div className="info-container">
          <div className="avatar-container">
            <img className="avatar" src={IMAGE_URL + lawyer?.image} alt="" />
          </div>
          <div className="info-block">
            <label>Name : </label>
            <p>{lawyer?.name}</p>
          </div>
          <div className="info-block">
            <label>Email : </label>
            <p>{lawyer?.email}</p>
          </div>
          <div className="info-block">
            <label>Phone number : </label>
            <p>70 100 200</p>
          </div>
          <div className="info-block">
            <label>State : </label>
            <p>{lawyer?.address?.state}</p>
          </div>
          <div className="info-block">
            <label>City : </label>
            <p>{lawyer?.address?.city}</p>
          </div>
          <div className="info-block">
            <label>Street : </label>
            <p>{lawyer?.address?.street}</p>
          </div>
          <div className="info-block">
            <label>Zip : </label>
            <p>{lawyer?.address?.zip}</p>
          </div>
          <div className="info-block">
            <label>Speciality : </label>
            <p>{lawyer?.speciality}</p>
          </div>
          <div className="info-block">
            <label>Description : </label>
            <p>{lawyer?.description}</p>
          </div>
          <div className="btn-back">
            <Link to="/user/dashboard/lawyers/">Back to lawyer list</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
