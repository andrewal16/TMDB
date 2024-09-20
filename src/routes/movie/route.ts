import { createBrowserRouter } from "react-router-dom"
import { initRoute } from "./initialRoutes"
export const router = createBrowserRouter([
    ...initRoute
])
