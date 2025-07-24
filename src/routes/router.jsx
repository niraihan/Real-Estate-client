import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layOut/MainLayout";
import Dashboard from "../components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";

import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties";
import PropertyDetails from "../pages/PropertyDetails";
import Wishlist from "../pages/Wishlist";
import NotFound from "../components/NotFound";

import MyProfile from "../pages/profile/MyProfile";
import MakeOffer from "../pages/MakeOffer";
import PropertyBought from "../pages/PropertyBought";
import PaymentPage from "../pages/PaymentPage";
import MyReviews from "../pages/MyReviews";

import AddProperty from "../pages/AddProperty";
import MyAddedProperties from "../pages/MyAddedProperties";
import UpdateProperty from "../pages/UpdateProperty";
import MySoldProperties from "../pages/MySoldProperties";
import RequestedProperties from "../pages/RequestedProperties";

import AdminProfile from "../pages/profile/AdminProfile";
import ManageProperties from "../pages/adminControl/ManageProperties";
import ManageReviews from "../pages/adminControl/ManageReviews";
import ManageUsers from "../pages/adminControl/ManageUsers";
import AdvertiseProperty from "../pages/adminControl/AdvertiseProperty";
import ReportedProperties from "../pages/ReportedProperties";
import ForgetPassword from "../components/ForgetPassword";
import AboutUs from "../pages/AboutUs";
import DynamicProfile from "../pages/profile/DynamicProfile";
import UserProfile from "../pages/profile/UserProfile";
import AgentProfile from "../pages/profile/AgentProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "loginRegister", element: <LoginRegister /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
      {
        path: "/about",
        element: <AboutUs />,
      },

      {
        path: "all-properties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },

      // Unified Dashboard
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DynamicProfile />,
          },
          { path: "user-profile", element: <UserProfile /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "make-offer/:id", element: <MakeOffer /> },
          { path: "property-bought", element: <PropertyBought /> },
          { path: "payment/:offerId", element: <PaymentPage /> },
          { path: "my-reviews", element: <MyReviews /> },

          // Agent routes
          { path: "agent-profile", element: <AgentProfile/> },
          // { path: "profile", element: <MyProfile /> },
          { path: "add-property", element: <AgentRoute><AddProperty /></AgentRoute> },
          { path: "my-added-properties", element: <AgentRoute><MyAddedProperties /></AgentRoute> },
          { path: "update-property/:id", element: <AgentRoute><UpdateProperty /></AgentRoute> },
          { path: "my-sold-properties", element: <AgentRoute><MySoldProperties /></AgentRoute> },
          { path: "requested-properties", element: <AgentRoute><RequestedProperties /></AgentRoute> },

          // Admin routes
          { path: "admin-profile", element: <AdminRoute><AdminProfile /></AdminRoute> },
          { path: "manage-properties", element: <AdminRoute><ManageProperties /></AdminRoute> },
          { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
          { path: "manage-reviews", element: <AdminRoute><ManageReviews /></AdminRoute> },
          { path: "advertise-property", element: <AdminRoute><AdvertiseProperty /></AdminRoute> },
          { path: "reported-properties", element: <AdminRoute><ReportedProperties /></AdminRoute> }
        ],
      },
    ],
  },
]);

export default router;
