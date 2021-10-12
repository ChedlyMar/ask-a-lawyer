import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import "./Login.css";

import { loginUser } from "../../redux/actions/user";
import { useParams } from "react-router";
import { loginLawyer } from "../../redux/actions/lawyer";

const Login: FC = () => {
  let { profile } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <form>
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
          <label>Password * </label>
        </div>
        <div className="input">
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        className="submit"
        onClick={(e) => {
          e.preventDefault();
          profile === "client"
            ? dispatch(loginUser({ email, password }, navigate))
            : dispatch(loginLawyer({ email, password }, navigate));
        }}
      >
        submit
      </button>
    </form>
  );
};

export default Login;
