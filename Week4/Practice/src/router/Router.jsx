import { createBrowserRouter } from "react-router";
import PoketmonDetail from "../pages/PoketmonDetail";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pokemon/:name",
    Component: PoketmonDetail,
  },
]);

export default router;
