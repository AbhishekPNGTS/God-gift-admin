import { lazy } from "react";
// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
// dashboard routing
const Dashboard = Loadable(lazy(() => import("views/dashboard/Default")));
// utilities routing
const Users = Loadable(lazy(() => import("views/utilities/users/users")));
const AddUser = Loadable(lazy(() => import("views/utilities/users/AddUser")));
const EditUser = Loadable(lazy(() => import("views/utilities/users/EditUser")));
const ViewUser = Loadable(lazy(() => import("views/utilities/users/ViewUser")));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      children: [
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "get-user-refferal/:id",
          element: <EditUser />,
        },
        {
          path: "view-user/:id",
          element: <ViewUser />,
        },
      ],
    },
  ],
};

export default MainRoutes;
