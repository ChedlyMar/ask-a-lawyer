

import Home from "../pages/Home/Home";
export const routes = 1
// export const routes = (isAuth: boolean) => [
//   // {
//   //   path: "/",
//   //   element: <Home />,
//   // },
//   // {},


// ]
// // {
// //   path: '/app', // protected routes
// //   element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
// //   children: [
// //     { path: '/dashboard', element: <Dashboard /> },
// //     { path: '/account', element: <Account /> },
// //     { path: '/', element: <Navigate to="/app/dashboard" /> },
// //     {
// //       path: 'member',
// //       element: <Outlet />,
// //       children: [
// //         { path: '/', element: <MemberGrid /> },
// //         { path: '/add', element: <AddMember /> },
// //       ],
// //     },
// //   ],
// // },
// // { // public routes
// //   path: '/',
// //   element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
// //   children: [
// //     { path: 'login', element: <Login /> },
// //     { path: '/', element: <Navigate to="/login" /> },
// //   ],
// // },