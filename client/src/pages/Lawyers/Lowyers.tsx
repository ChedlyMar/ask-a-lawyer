import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../interfaces/state";
import { getAllLawyers } from "../../redux/actions/lawyer";
import Card from "./Card/Card";

import "./Lawyers.css";

const Lawyers = () => {
  const state = [
    "",
    "Tunis",
    "Ariana",
    "Ben Arous",
    "Mannouba",
    "Bizerte",
    "Nabeul",
    "Beja",
    "Jendouba",
    "Zaghouan",
    "Siliana",
    "Le Kef",
    "Sousse",
    "Monastir",
    "Mahdia",
    "Kasserine",
    "Sidi Bouzid",
    "Kairouan",
    "Gafsa",
    "Sfax",
    "Gabes",
    "Médenine",
    "Tozeur",
    "Kebili",
    "Ttataouine",
  ];

  const [searchBy, setSearchBy] = useState("");
  const [searchByState, setSearchByState] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLawyers());
  }, []);
  const lawyerList = useSelector((state: IState) => state.lawyer.allLawyer);

  return (
    <div className="lawyers-container">
      <div className="search-container">
        <div className="search-lawyer">
          <label>Search by name</label>
          <input
            type="text"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          />
        </div>
        <div className="search-lawyer">
          <label>Search by state</label>
          <select
            value={searchByState}
            onChange={(e) => setSearchByState(e.target.value)}
          >
            {state.map((o) => (
              <option key={o} value={o}>
                {o ? o : "All"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="lawyer-list">
        {lawyerList
          .filter(
            (lawyer) =>
              lawyer.name
                ?.toLowerCase()
                .includes(searchBy.toLowerCase().trim()) &&
              lawyer.address?.state
                ?.toLowerCase()
                .includes(searchByState.toLowerCase().trim())
          )
          .map((lawyer) => (
            <Card lawyer={lawyer} key={lawyer._id} />
          ))}
      </div>
    </div>
  );
};

export default Lawyers;
