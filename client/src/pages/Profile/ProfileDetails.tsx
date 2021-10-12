import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../constants/api";
import { IState } from "../../interfaces/state";
import "./ProfileDetails.css";

const ProfileDetails = () => {
  const lawyer = useSelector((state: IState) => state.lawyer.lawyer);
  const user = useSelector((state: IState) => state.user.user);

  const navigate = useNavigate();

  return (
    <>
      {!user && !lawyer && <div />}
      {user && (
        <div className="info-container">
          <div className="avatar-container">
            <img className="avatar" src={IMAGE_URL + user.image} alt="" />
          </div>
          <div className="info-block">
            <label>Name : </label>
            <p>{user?.name}</p>
          </div>
          <div className="info-block">
            <label>Email : </label>
            <p>{user?.email}</p>
          </div>
          <div className="btn-groupe">
            <button
              className="submit"
              onClick={() => {
                navigate("/user/dashboard/edit-user", {
                  replace: true,
                });
              }}
            >
              Edit
            </button>
            <Link to="/user/dashboard/">Go Back</Link>
          </div>
        </div>
      )}
      {lawyer && (
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
          <div className="btn-groupe">
            <button
              className="submit"
              onClick={() =>
                navigate("/lawyer/dashboard/edit-lawyer", {
                  replace: true,
                })
              }
            >
              Edit
            </button>
            <Link to="/lawyer/dashboard">Go Back</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
