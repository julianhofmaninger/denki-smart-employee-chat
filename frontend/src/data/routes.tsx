import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/default-components/layout/layout";
import { getConfig } from "../config/config";
import Chat from "../features/chat/chat";
import Logout from "../features/authentication/logout";
import FlaggedChats from "../features/flagged-chats/flagged-chats";
const Authentication = React.lazy(() => import('../features/authentication/authentication'));

const Routes = () => {
  // const auth = useAuth();
  const routes = getConfig().environment === "development" ?
    [
      {
        path: "/",
        element: <Authentication />,
      },
      {
        path: "/login",
        element: <Authentication />,
      },
      {
        path: "/home",
        element: <Layout><Chat/></Layout>,
      },
      {
        path: "/flagged-chats",
        element: <Layout><FlaggedChats/></Layout>,
      },
      {
        path: "/logout",
        element: <Layout><Logout /></Layout>,
      }
    ]
    :
    [
      {
        path: "/",
        element: <Authentication />,
      },
      {
        path: "/login",
        element: <Authentication />,
      },
      {
        path: "/home",
        element: <Layout><Chat/></Layout>,
      },
      {
        path: "/flagged-chats",
        element: <Layout><FlaggedChats/></Layout>,
      },
      {
        path: "/logout",
        element: <Layout><Logout /></Layout>,
      }
    ]

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Routes;