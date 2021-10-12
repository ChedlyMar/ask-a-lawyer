import IRoute from "../interfaces/route"

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from '../pages/Dashboard/Dashboard'

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home Page",
    component: Home,
    exact: true,
    // props:
  },
  {
    path: "/signup",
    name: "signup Page",
    component: Signup,
    exact: true,
    // props:
  },
  {
    path: "/login",
    name: "login Page",
    component: Login,
    exact: true,
    // props:
  },
  {
    path: "/dashboard",
    name: "adshboard Page",
    component: Dashboard,
    exact: true,
    // props:
  }
]

export default routes