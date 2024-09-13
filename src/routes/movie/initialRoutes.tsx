import { RouteObject } from "react-router-dom";
import Layout from "../../components/Layout";
import { movieRoute } from "./moviesRoute";
export const initRoute: RouteObject[] = [
  {
    element: <Layout />,
    children: [...movieRoute],
  },
];
