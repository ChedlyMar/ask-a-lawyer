import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../constants/api";
import { IState } from "../../interfaces/state";
import { updateLawyer } from "../../redux/actions/lawyer";
import { updateUser } from "../../redux/actions/user";

import "./Profile.css";

const Profile = () => {
  const lawyer = useSelector((state: IState) => state.lawyer.lawyer);
  const user = useSelector((state: IState) => state.user.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (lawyer) {
      setName(lawyer.name);
      setEmail(lawyer.email);
      setSpeciality(lawyer.speciality);
      setDescription(lawyer.description);
      setState(lawyer.address?.state);
      setCity(lawyer.address?.city);
      setStreet(lawyer.address?.street);
      setZip(lawyer.address?.zip);
    }
  }, [user, lawyer]);
  const [name, setName] = useState(user?.name || lawyer?.name);

  const [email, setEmail] = useState(user?.email || lawyer?.email);

  const [speciality, setSpeciality] = useState(lawyer?.speciality);
  const [description, setDescription] = useState(lawyer?.description);
  const [state, setState] = useState(lawyer?.address?.state);
  const [city, setCity] = useState(lawyer?.address?.city);
  const [street, setStreet] = useState(lawyer?.address?.street);
  const [zip, setZip] = useState(lawyer?.address?.zip);

  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileChangeHandler = (e: any) => {
    setFile(e.target.files[0]);
  };

  const saveUser = (e: any) => {
    e.preventDefault();
    const fd = new FormData();
    if (name && email) {
      fd.append("name", name);
      fd.append("email", email);
    }
    if (file) fd.append("file", file);
    if (user._id) dispatch(updateUser(fd, user._id, navigate));
  };

  const saveLawyer = (e: any) => {
    e.preventDefault();
    const fd = new FormData();
    const address = {
      state,
      city,
      street,
      zip,
    };
    if (name && email && speciality && description && address) {
      fd.append("name", name);
      fd.append("email", email);
      fd.append("speciality", speciality);
      fd.append("description", description);
      fd.append("address", JSON.stringify(address));
    }
    if (file) fd.append("file", file);
    if (lawyer?._id) dispatch(updateLawyer(fd, lawyer._id, navigate));
  };

  return (
    <>
      {!user && !lawyer && <div />}

      {(user || lawyer) && (
        <form>
          <div className="avatar-container">
            {user ? (
              <img className="avatar" src={IMAGE_URL + user.image} alt="" />
            ) : (
              <img className="avatar" src={IMAGE_URL + lawyer?.image} alt="" />
            )}
          </div>
          <div className="input-group">
            <div className="label">
              <label>Name * </label>
            </div>
            <div className="input">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="label">
              <label>Email * </label>
            </div>
            <div className="input">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="label">
              <label>Image</label>
            </div>
            <div className="input">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i> Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                name="image"
                onChange={fileChangeHandler}
              />
            </div>
          </div>
          {lawyer && (
            <div>
              <div className="input-group">
                {/* add img */}
                <div className="label">
                  <label>State * </label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="label">
                  <label>City * </label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="label">
                  <label>Street * </label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="label">
                  <label>Zip * </label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="label">
                  <label>Speciality * </label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="label">
                  <label>Desription * </label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          {user ? (
            <div className="btn-groupe">
              <button className="submit" onClick={saveUser}>
                Save
              </button>
              <Link to="/user/dashboard/profile">Cancel</Link>
            </div>
          ) : (
            <div className="btn-groupe">
              <button className="submit" onClick={saveLawyer}>
                Save
              </button>
              <Link to="/lawyer/dashboard/profile">Cancel</Link>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default Profile;
