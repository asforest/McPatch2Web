import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/Home/index.jsx";
import NotFound from "@/pages/NotFound/index.jsx";
import Dashboard from "@/pages/Dashboard/index.jsx";
import Overview from "@/pages/Dashboard/Overview/index.jsx";
import Folder from "@/pages/Dashboard/Folder/index.jsx";
import Log from "@/pages/Dashboard/Log/index.jsx";
import Help from "@/pages/Dashboard/Help/index.jsx";
import Settings from "@/pages/Dashboard/Settings/index.jsx";
import Login from "@/pages/Login/index.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    children: [
      {
        index: true,
        element: <Overview/>
      },
      {
        path: 'folder',
        element: <Folder/>
      },
      {
        path: 'log',
        element: <Log/>
      },
      {
        path: 'help',
        element: <Help/>
      },
      {
        path: 'settings',
        element: <Settings/>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

export default router