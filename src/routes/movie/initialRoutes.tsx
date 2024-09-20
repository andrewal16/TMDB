import { RouteObject } from "react-router-dom";
import Layout from "../../components/Layout";
import { movieRoute } from "./moviesRoute";
import { userRoute } from "./userRoute";
import ProtectedRoute from "./ProtectedRoute";
export const initRoute: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      ...userRoute
    ,
    {
      element: <ProtectedRoute />,
      children: [...movieRoute, ],
    }
  ],
  },
];
