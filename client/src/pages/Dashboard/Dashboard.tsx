import { FC } from "react";
import { Outlet } from "react-router-dom";

import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard: FC = () => {
  return (
    <div className="dash-container">
      <div className="Sidebar">
        <Sidebar />
      </div>
      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
