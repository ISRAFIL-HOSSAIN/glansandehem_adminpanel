import React, { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppOutlet from "./outlets/AppOutlet";
import AuthorizedOutlet from "./outlets/AuthorizedOutlet";
import UnauthorizedOutlet from "./outlets/UnauthorizedOutlet";


const Service = lazy(() => import("./page/Service"));
const Profile = lazy(() => import("./page/Profile"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const Support = lazy(() => import("./page/Support"));

const ServiceTake = lazy(()=> import("./page/ServiceTaken"))

const Signin = lazy(() => import("./page/Signin"));

const Stores = lazy(() => import("./page/Stores"));
const Earnings = lazy(() => import("./page/Earnings"));
const ControlPanel = lazy(() => import("./page/ControlPanel"));
const Transport = lazy(() => import("./page/Transport"));


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppOutlet />,
      children: [
        //auth
        {
          path: "login",
          element: <UnauthorizedOutlet />,
          children: [
            {
              path: "",
              element: <Signin />,
            },
            
            {
              path: "*",
              element: <Navigate to={"/login"} />,
            },
          ],
        },

        // main layout
        {
          path: "",
          element: <AuthorizedOutlet />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path:"service-taken",
              element: <ServiceTake />
            },
            {
              path: "stores",
              element: <Stores />,
            },
            {
              path: "service",
              element: <Service />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "earnings",
              element: <Earnings />,
            },
            {
              path: "control-panel",
              element: <ControlPanel />,
            },
            {
              path: "support",
              element: <Support />,
            },
            {
              path: "transport",
              element: <Transport />,
            },
            {
              path: "*",
              element: <Navigate to={"/"} />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
