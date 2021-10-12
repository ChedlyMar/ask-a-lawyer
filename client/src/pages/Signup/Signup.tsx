import axios from "axios";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { registerLawyer } from "../../redux/actions/lawyer";
import { registerUser } from "../../redux/actions/user";

const Signup: FC = () => {
  const { profile } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState({
    state: "",
    city: "",
    street: "",
    zip: "",
  });
  const [speciality, setSpeciality] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState("Upload File");
  const fd = new FormData();

  const fileChangeHandler = (e: any) => {
    setFile(e.target.files[0]);
  };

  // const fileHandler = async (e: any) => {
  //   e.preventDefault();
  //   if (file) fd.append("image", file);
  //   console.log(fd);
  //   console.log(file);
  // };

  const send = (e: any) => {
    e.preventDefault();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("password", password);
    fd.append("file", file);

    if (profile === "user") dispatch(registerUser(fd, navigate));
    else {
      dispatch(
        registerLawyer(
          { name, email, password, address, speciality, description },
          navigate
        )
      );
    }
  };

  return (
    <form>
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
          <label>{fileName} * </label>
        </div>

        <div className="input">
          <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Upload Image
          </label>
          <input
            id="file-upload"
            accept=".jpeg"
            type="file"
            onChange={fileChangeHandler}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="label">
          <label>Password * </label>
        </div>
        <div className="input">
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      {profile === "lawyer" && (
        <div>
          <div className="input-group">
            <div className="label">
              <label>State * </label>
            </div>
            <div className="input">
              <input
                type="text"
                name="password"
                value={address.state}
                onChange={(e) => {
                  setAddress({ ...address, state: e.target.value });
                }}
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
                name="password"
                value={address.city}
                onChange={(e) => {
                  setAddress({ ...address, city: e.target.value });
                }}
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
                name="password"
                value={address.street}
                onChange={(e) => {
                  setAddress({ ...address, street: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="label">
              <label>Zip Code * </label>
            </div>
            <div className="input">
              <input
                type="text"
                name="password"
                value={address.zip}
                onChange={(e) => {
                  setAddress({ ...address, zip: e.target.value });
                }}
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
                name="password"
                value={speciality}
                onChange={(e) => {
                  setSpeciality(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="label">
              <label>Description * </label>
            </div>
            <div className="input">
              <input
                type="text"
                name="password"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="btn-groupe">
        <button className="submit" onClick={send}>
          submit
        </button>
        <Link to="/">Cancel</Link>
      </div>
    </form>
  );
};

export default Signup;
