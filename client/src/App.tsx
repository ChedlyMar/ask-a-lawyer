import { useRoutes, Navigate } from "react-router-dom";
import "./App.css";

// Component
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chat from "./pages/Chat/Chat";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Lawyers from "./pages/Lawyers/Lowyers";
import LawyerMessenger from "./pages/Messenger/Lawyer/Messenger";
import UserMessenger from "./pages/Messenger/Messenger";
import Info from "./pages/Lawyers/Info/Info";
import ProfileDetails from "./pages/Profile/ProfileDetails";
import ContactUs from "./pages/ContactUs/ContactUs";
import UserDashboard from "./pages/Dashboard/UserDashboard/UserDashboard";
import { useEffect } from "react";
import { current } from "./redux/actions/user";
import { useDispatch } from "react-redux";
import { currentLawyer } from "./redux/actions/lawyer";

function App() {
  const isAuth = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile === "user") dispatch(current());
    if (profile === "lawyer") dispatch(currentLawyer());
  }, []);

  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/contact",
      element: <ContactUs />,
    },
    {
      path: "/login/:profile",
      element: <Login />,
    },

    {
      path: "/signup/:profile",
      element: <Signup />,
    },
    {
      //protected
      path: "/lawyer/dashboard",
      element: isAuth ? <Dashboard /> : <Navigate to="/login/lawyer" />,
      children: [
        {
          path: "/profile",
          element: <ProfileDetails />,
        },
        {
          path: "/edit-lawyer",
          element: <Profile />,
        },
        // {
        //   path: "/lawyers",
        //   element: <Lawyers />,
        // },
        {
          path: "/settings",
          element: <Settings />,
        },
        // {
        //   path: "/chat",
        //   element: <Chat />,
        // },
        {
          path: "/messenger",
          element: <LawyerMessenger />,
        },
      ],
    },
    {
      //protected
      path: "/user/dashboard",
      element: isAuth ? <Dashboard /> : <Navigate to="/login/user" />,
      children: [
        {
          path: "/",
          element: <UserDashboard />,
        },
        {
          path: "/profile",
          element: <ProfileDetails />,
        },
        {
          path: "/edit-user",
          element: <Profile />,
        },
        {
          path: "/lawyers",
          children: [
            {
              path: "/",
              element: <Lawyers />,
            },
            {
              path: "/:lawyerId",
              element: <Info />,
            },
          ],
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
        {
          path: "/messenger",
          element: <UserMessenger />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <Header />
      {element}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
