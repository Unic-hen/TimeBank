import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter } from "react-router-dom";
import { IsPC } from "@/utils/equipment";
// base
import Layout from "@/layout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MoreInfo from "@/pages/MoreInfo";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/ErrorPage";
import Activities from "@/pages/Activities";
import ForgetPwd from "@/pages/ForgetPwd";
import FeedBack from "@/pages/FeedBack";
import Tours from "@/pages/Tours";
// events
import Events from "@/pages/Events";
import New from "@/pages/Events/New";
import History from "@/pages/Events/History";
import CurrentEvents from "@/pages/Events/CurrentEvents";
import Detial from "@/pages/Events/Detial";
import Demand from "@/pages/Events/Demand";
// user
import User from "@/pages/User";
import UserInfo from "@/pages/User/UserInfo";
import VoluntaryProject from "@/pages/User/VoluntaryProject";
import Tissue from "@/pages/User/Tissue";
import Settings from "@/pages/User/Settings";
import Wish from "@/pages/User/Wish";
import MyTrade from "@/pages/User/MyTrade";
// admin
import Admin from "@/pages/Admin";
import Comment from "@/pages/Admin/Comment";
import ForLogin from "@/pages/Admin/ForLogin";
import ReleasaEvent from "@/pages/Admin/ReleaseEvent";
import SignService from "@/pages/Admin/SignService";
import EventAudit from "@/pages/Admin/EventAudit";
import Train from "@/pages/Admin/Train";
import Guide from "@/pages/Admin/Guide";
import Info from "@/pages/Admin/EventAudit/Info";
import Panel from "@/pages/Admin/Panel";
import LookRelease from "@/pages/Admin/ReleaseEvent/LookRelease";
import LookUser from "@/pages/Admin/ForLogin/LookUser";
import LookSign from "@/pages/Admin/SignService/LookSign";
import UserManage from "@/pages/Admin/UserManage";
import ViewUser from "@/pages/Admin/UserManage/ViewUser";
import Tracking from "@/pages/Admin/Tracking";
import BlockPanel from "../pages/Admin/BlockPanel";
// Train
import Training from "@/pages/Training";
import Exams from "@/pages/Training/Exams";
import Participate from "@/pages/Training/Participate";
import TrainInfo from "@/pages/Training/TrainInfo";
import MyTrains from "@/pages/Training/MyTrains";
import Test from "@/pages/Training/Test";
import Certificat from "@/pages/Training/Certificat";
const router = createBrowserRouter(
  IsPC()
    ? [
        // ...PC端路由配置
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgetpwd",
          element: <ForgetPwd />,
        },

        {
          path: "/admin",
          element: <Admin />,
          children: [
            {
              index: true,
              path: "/admin/panel",
              element: <Panel />,
            },
            {
              path: "/admin/comment",
              element: <Comment />,
            },

            {
              path: "/admin/forlogin",
              element: <ForLogin />,
            },
            {
              path: "/admin/releaseevent",
              element: <ReleasaEvent />,
            },
            {
              path: "/admin/signservice",
              element: <SignService />,
            },
            {
              path: "/admin/eventaudit",
              element: <EventAudit />,
            },
            {
              path: "/admin/guide",
              element: <Guide />,
            },
            {
              path: "/admin/train",
              element: <Train />,
            },
            {
              path: "/admin/info",
              element: <Info />,
            },
            {
              path: "/admin/lookuser",
              element: <LookUser />,
            },
            {
              path: "/admin/lookrelease",
              element: <LookRelease />,
            },
            {
              path: "/admin/looksign",
              element: <LookSign />,
            },
            {
              path: "/admin/usermanage",
              element: <UserManage />,
            },
            {
              path: "/admin/viewuser",
              element: <ViewUser />,
            },
            {
              path: "/admin/tracking",
              element: <Tracking />,
            },
            {
              path: "/admin/blockpanel",
              element: <BlockPanel />,
            },
          ],
        },

        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/user",
              element: <User />,
              children: [
                {
                  path: "/user/info",
                  element: <UserInfo />,
                },
                {
                  path: "/user/voluntaryproject",
                  element: <VoluntaryProject />,
                },
                {
                  path: "/user/tissue",
                  element: <Tissue />,
                },
                {
                  path: "/user/settings",
                  element: <Settings />,
                },
                {
                  path: "/user/history",
                  element: <History />,
                },
                {
                  path: "/user/wish",
                  element: <Wish />,
                },
                {
                  path: "/user/mytrade",
                  element: <MyTrade />,
                },
              ],
            },
            {
              path: "/events",
              element: <Events />,
              children: [
                {
                  path: "/events/history",
                  element: <History />,
                },
                {
                  path: "/events/currentevents",
                  element: <CurrentEvents />,
                },
                {
                  path: "/events/new",
                  element: <New />,
                },
                {
                  path: "/events/detial",
                  element: <Detial />,
                },
                {
                  path: "/events/demand",
                  element: <Demand />,
                },
              ],
            },
            {
              path: "/train",
              element: <Training />,
              children: [
                {
                  path: "/train/exams",
                  element: <Exams />,
                },
                {
                  path: "/train/mytrains",
                  element: <MyTrains />,
                },
                {
                  path: "/train/participate",
                  element: <Participate />,
                },
                {
                  path: "/train/traininfo",
                  element: <TrainInfo />,
                },
                {
                  path: "/train/test",
                  element: <Test />,
                },
                {
                  path: "/train/certificat",
                  element: <Certificat />,
                },
              ],
            },
            {
              path: "/activities",
              element: <Activities />,
            },
            {
              path: "/feedback",
              element: <FeedBack />,
            },
            {
              path: "/guide",
              element: <Tours />,
            },
            {
              path: "/moreinfo",
              element: <MoreInfo />,
            },
            {
              index: true,
              element: <Home />,
            },
            {
              // 处理成两个路由分布处理权限
              path: "/new",
              element: <New />,
            },
          ],
        },

        {
          path: "*",
          element: <ErrorPage />,
        },
      ]
    : [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/moreinfo",
          element: <MoreInfo />,
        },
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/userinfo",
              element: <UserInfo />,
            },
            {
              index: true,
              element: <Home />,
            },
          ],
        },
        {
          // 处理成两个路由分布处理权限
          path: "/new",
          element: <New />,
        },
        {
          path: "/account",
          element: <AccountInfo />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ]
);

export default router;
